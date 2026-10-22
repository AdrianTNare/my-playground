"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ACCENT_OPTIONS } from "@/components/AccentPicker";
import { fuzzyMatch } from "@/lib/fuzzy";
import type { PaletteLink } from "@/lib/palette";
import { playTick } from "@/lib/sound";
import { useUiStore } from "@/stores/ui";

const EMAIL = "adriantnare@icloud.com";
const OPEN_EVENT = "palette:open";
const GG_WINDOW_MS = 500;

/** Opens the palette from anywhere, e.g. a button in the sidebar. */
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

interface CommandPaletteProps {
  links: PaletteLink[];
}

type Mode = "insert" | "normal";

interface Item {
  id: string;
  label: string;
  hint: string;
  tag: string;
  /** Returns a status line to show, or nothing to close the palette. */
  run: () => string | void;
}

interface HighlightProps {
  text: string;
  hits: number[];
}

const Highlight = ({ text, hits }: HighlightProps) => {
  const set = new Set(hits);
  const parts: ReactNode[] = [];
  for (let i = 0; i < text.length; i++) {
    parts.push(
      set.has(i) ? (
        <span key={i} className="text-accent">
          {text[i]}
        </span>
      ) : (
        text[i]
      ),
    );
  }
  return <>{parts}</>;
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const tick = () => {
  if (!useUiStore.getState().muted) playTick();
};

/**
 * ⌘K / Ctrl+K / `/` palette: fuzzy-find any booth, project or entry, plus a
 * few commands. Vim-flavoured: typing is insert mode; Esc drops to normal
 * mode where j/k/gg/G move and i goes back to typing; Esc again closes.
 */
export const CommandPalette = ({ links }: CommandPaletteProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastG = useRef(0);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("insert");
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const muted = useUiStore((state) => state.muted);
  const accent = useUiStore((state) => state.accent);

  // Stable (refs and setters only), so the window listeners attach once.
  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setMode("insert");
    setIndex(0);
    setStatus(null);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = () => dialogRef.current?.close();

  // Global shortcuts need a window listener; no event prop reaches here.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const combo =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slash =
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTyping(event.target) &&
        !document.querySelector("dialog[open]");
      if (!combo && !slash) return;
      event.preventDefault();
      if (dialogRef.current?.open) dialogRef.current.close();
      else open();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, open);
    document.documentElement.setAttribute("data-palette", "ready");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open]);

  const navigate = (href: string) => {
    router.push(href);
  };

  const items: Item[] = [
    ...links.map((link) => ({
      id: link.id,
      label: link.label,
      hint: link.hint,
      tag: link.kind,
      run: () => navigate(link.href),
    })),
    {
      id: "cmd:email",
      label: "copy email",
      hint: EMAIL,
      tag: "cmd",
      run: () => {
        try {
          void navigator.clipboard?.writeText(EMAIL);
        } catch {
          /* clipboard unavailable */
        }
        return `copied ${EMAIL} ✓`;
      },
    },
    {
      id: "cmd:sound",
      label: muted ? "sound on" : "sound off",
      hint: `clicks are ${muted ? "off" : "on"}`,
      tag: "cmd",
      run: () => {
        useUiStore.getState().toggleMuted();
        return `sound: ${muted ? "on" : "off"}`;
      },
    },
    ...ACCENT_OPTIONS.map((option) => ({
      id: `cmd:accent:${option.name}`,
      label: `accent ${option.name}`,
      hint: accent === option.value ? "current" : option.value,
      tag: "cmd",
      run: () => {
        useUiStore.getState().setAccent(option.value);
        return `accent: ${option.name}`;
      },
    })),
    {
      id: "cmd:github",
      label: "open github",
      hint: "github.com/AdrianTNare",
      tag: "link",
      run: () => {
        window.open("https://github.com/AdrianTNare", "_blank", "noopener");
      },
    },
    {
      id: "cmd:linkedin",
      label: "open linkedin",
      hint: "linkedin.com/in/adriantnare",
      tag: "link",
      run: () => {
        window.open(
          "https://www.linkedin.com/in/adriantnare/",
          "_blank",
          "noopener",
        );
      },
    },
  ];

  const results = items
    .map((item) => ({ item, match: fuzzyMatch(query, item.label) }))
    .filter((result) => result.match !== null)
    .sort((a, b) => (query ? b.match!.score - a.match!.score : 0));

  const selected = Math.min(index, Math.max(results.length - 1, 0));

  const move = (to: number) => {
    const next = Math.max(0, Math.min(results.length - 1, to));
    if (next !== selected) tick();
    setIndex(next);
  };

  const runItem = (item: Item) => {
    tick();
    const message = item.run();
    if (message) setStatus(message);
    else close();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    // Always available, either mode.
    if (
      key === "ArrowDown" ||
      (event.ctrlKey && (key === "n" || key === "j"))
    ) {
      event.preventDefault();
      return move(selected + 1);
    }
    if (key === "ArrowUp" || (event.ctrlKey && (key === "p" || key === "k"))) {
      event.preventDefault();
      return move(selected - 1);
    }
    if (key === "Enter") {
      event.preventDefault();
      const result = results[selected];
      if (result) runItem(result.item);
      return;
    }
    if (key === "Escape") {
      // First Esc leaves insert mode; the dialog only closes from normal mode.
      if (mode === "insert") {
        event.preventDefault();
        setMode("normal");
      }
      return;
    }

    if (mode === "insert") {
      setStatus(null);
      return;
    }

    // Normal mode: keys are motions, never text.
    if (event.metaKey || event.ctrlKey || event.altKey || key.length > 1)
      return;
    event.preventDefault();
    switch (key) {
      case "j":
        return move(selected + 1);
      case "k":
        return move(selected - 1);
      case "G":
        return move(results.length - 1);
      case "g": {
        const now = performance.now();
        if (now - lastG.current < GG_WINDOW_MS) {
          lastG.current = 0;
          move(0);
        } else lastG.current = now;
        return;
      }
      case "l": {
        const result = results[selected];
        if (result) runItem(result.item);
        return;
      }
      case "i":
      case "a":
      case "/":
        return setMode("insert");
    }
  };

  const listId = "palette-results";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Find a booth or run a command"
      onCancel={(event) => {
        // Backup for browsers that fire cancel despite the keydown handler.
        if (mode === "insert") {
          event.preventDefault();
          setMode("normal");
        }
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) close();
      }}
      className="palette-dialog m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-32px))] max-w-none overflow-hidden rounded-[10px] border border-edge bg-panel p-0 text-body shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-2 border-b border-[#2f2722] px-4 py-3 font-mono text-[14px]">
        <span aria-hidden className="shrink-0 text-amber">
          adrian@nare<span className="text-muted">:</span>
          <span className="text-accent">~</span>
          <span className="text-muted">$</span> cd
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={
            results[selected]
              ? `palette-${results[selected].item.id}`
              : undefined
          }
          aria-label="Search booths, projects and commands"
          autoComplete="off"
          spellCheck={false}
          placeholder="booth, project or command"
          className={`min-w-0 flex-1 bg-transparent text-bright outline-none placeholder:text-[#6e6157] ${
            mode === "normal" ? "caret-transparent" : "caret-accent"
          }`}
        />
      </div>

      <ul
        id={listId}
        role="listbox"
        aria-label="Results"
        className="max-h-[min(52vh,420px)] overflow-y-auto py-1.5 font-mono text-[13px]"
      >
        {results.length === 0 && (
          <li className="px-4 py-3 text-muted">
            cd: no such booth: <span className="text-bright">{query}</span>
          </li>
        )}
        {results.map(({ item, match }, i) => {
          const active = i === selected;
          return (
            <li
              key={item.id}
              id={`palette-${item.id}`}
              role="option"
              aria-selected={active}
              ref={
                active
                  ? (el) => el?.scrollIntoView({ block: "nearest" })
                  : undefined
              }
              onClick={() => runItem(item)}
              onPointerMove={() => i !== selected && setIndex(i)}
              className={`flex cursor-pointer items-baseline gap-3 px-4 py-2 ${
                active ? "bg-panel2 text-bright" : "text-clay"
              }`}
            >
              <span aria-hidden className="w-3 shrink-0 text-accent">
                {active ? ">" : ""}
              </span>
              <span className="shrink-0">
                <Highlight text={item.label} hits={match!.hits} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[12px] text-muted">
                {item.hint}
              </span>
              <span className="shrink-0 text-[11px] text-[#6e6157]">
                {item.tag}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-[#2f2722] px-4 py-2 font-mono text-[11px] text-muted">
        <span
          aria-live="polite"
          className={
            status ? "text-sage" : mode === "normal" ? "text-amber" : ""
          }
        >
          {status ?? (mode === "normal" ? "-- NORMAL --" : "-- INSERT --")}
        </span>
        <span className="hidden text-[#6e6157] sm:inline">
          {mode === "normal"
            ? "j/k move · gg/G ends · i type · esc close"
            : "↑↓ move · ↵ open · esc normal mode"}
        </span>
      </div>
    </dialog>
  );
};
