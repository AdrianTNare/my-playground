"use client";

import { useEffect, type RefObject } from "react";
import { playTick } from "@/lib/sound";
import { useUiStore } from "@/stores/ui";

const GG_WINDOW_MS = 500;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const tick = () => {
  if (!useUiStore.getState().muted) playTick();
};

/**
 * Vim keys for the booth tree, page-wide: j/k move, gg/G jump to the ends,
 * l opens, h goes to the first booth of the enclosing group, Esc lets go.
 * The "selection" is plain keyboard focus on a tree link, so Enter, Tab and
 * screen readers keep working as usual.
 */
export const useVimNav = (
  navRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) => {
  // A page-wide shortcut has to subscribe to window keydown; there is no
  // render-time or event-prop equivalent.
  useEffect(() => {
    if (!enabled) return;
    let lastG = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (isTyping(event.target)) return;

      const nav = navRef.current;
      // offsetParent is null while the tree is hidden (sidebar below lg).
      if (!nav || nav.offsetParent === null) return;

      const links = [
        ...nav.querySelectorAll<HTMLAnchorElement>("a[data-booth-link]"),
      ];
      if (links.length === 0) return;

      const focused = links.indexOf(
        document.activeElement as HTMLAnchorElement,
      );
      const here = links.findIndex(
        (link) => link.getAttribute("aria-current") === "page",
      );
      // Without a selection yet, moves start from the page you're on.
      const from = focused >= 0 ? focused : Math.max(here, 0);

      let next: number | null = null;
      switch (event.key) {
        case "j":
          next = Math.min(links.length - 1, from + 1);
          break;
        case "k":
          next = Math.max(0, from - 1);
          break;
        case "G":
          next = links.length - 1;
          break;
        case "g": {
          const now = performance.now();
          if (now - lastG < GG_WINDOW_MS) {
            next = 0;
            lastG = 0;
          } else {
            lastG = now;
          }
          break;
        }
        case "h": {
          const group = links[from].closest("ul")?.parentElement?.closest("li");
          const first =
            group?.querySelector<HTMLAnchorElement>("a[data-booth-link]");
          if (first) next = links.indexOf(first);
          break;
        }
        case "l":
          if (focused >= 0) {
            event.preventDefault();
            tick();
            links[focused].click();
          }
          return;
        case "Escape":
          if (focused >= 0) links[focused].blur();
          return;
        default:
          return;
      }

      if (next === null) return;
      event.preventDefault();
      if (next !== focused) tick();
      links[next].focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navRef, enabled]);
};
