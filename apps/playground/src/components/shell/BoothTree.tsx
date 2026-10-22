"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { booths, isActive, type Booth } from "@/booths";
import type { BoothCounts } from "@/lib/counts";
import { useVimNav } from "./useVimNav";

interface BoothTreeProps {
  /** Called after a booth is picked, e.g. to close the mobile menu. */
  onNavigate?: () => void;
  /** Taller rows for touch. */
  roomy?: boolean;
  /** Drive this tree with vim keys page-wide (see useVimNav). */
  vimKeys?: boolean;
  /** Real entries per booth; shown muted, like `til (6)`. */
  counts?: BoothCounts;
}

interface BranchProps {
  items: Booth[];
  pathname: string;
  roomy: boolean;
  onNavigate?: () => void;
  counts: BoothCounts;
}

// `tree`-style connectors drawn with borders rather than box-drawing glyphs,
// so the vertical rule stays joined at any row height. Every item gets a
// trunk segment (::before) and an elbow (::after); the last item's trunk
// stops at the elbow.
const itemConnectors =
  "relative pl-[22px] before:absolute before:top-0 before:left-[3px] before:h-full before:border-l before:border-[#4a3f37] last:before:h-[var(--elbow)] after:absolute after:top-[var(--elbow)] after:left-[3px] after:w-[13px] after:border-t after:border-[#4a3f37]";

const Branch = ({
  items,
  pathname,
  roomy,
  onNavigate,
  counts,
}: BranchProps) => {
  const rowHeight = roomy ? "min-h-11" : "min-h-7";

  return (
    <ul className={roomy ? "[--elbow:22px]" : "[--elbow:14px]"}>
      {items.map((booth) => {
        const children = booth.children ?? [];
        const active = children.length === 0 && isActive(pathname, booth.href);

        return (
          <li key={booth.name} className={itemConnectors}>
            {children.length > 0 ? (
              <span className={`flex items-center text-muted ${rowHeight}`}>
                {booth.name}/
              </span>
            ) : (
              <Link
                href={booth.href}
                data-nav-sound
                data-booth-link
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={`group flex w-fit items-center gap-1.5 rounded-sm transition-colors focus-visible:text-accent focus-visible:outline-none ${rowHeight} ${
                  active ? "text-bright" : "text-clay hover:text-accent"
                }`}
              >
                {booth.name}
                {(counts[booth.href] ?? 0) > 0 && (
                  <span className="text-[#6e6157]">({counts[booth.href]})</span>
                )}
                {active ? (
                  <span
                    aria-hidden
                    className="inline-block h-[1.05em] w-[0.55em] bg-accent cursor-blink"
                  />
                ) : (
                  // Hollow cursor: the keyboard selection (j/k or Tab).
                  <span
                    aria-hidden
                    className="hidden h-[1.05em] w-[0.55em] border border-accent group-focus-visible:inline-block"
                  />
                )}
              </Link>
            )}
            {children.length > 0 && (
              <Branch
                items={children}
                pathname={pathname}
                roomy={roomy}
                onNavigate={onNavigate}
                counts={counts}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export const BoothTree = ({
  onNavigate,
  roomy = false,
  vimKeys = false,
  counts = {},
}: BoothTreeProps) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  useVimNav(navRef, vimKeys);

  return (
    <nav
      ref={navRef}
      aria-label="Booths"
      className={`font-mono ${roomy ? "text-[15px]" : "text-[13px]"}`}
    >
      <div aria-hidden className="leading-none text-muted">
        .
      </div>
      <Branch
        items={booths}
        pathname={pathname}
        roomy={roomy}
        onNavigate={onNavigate}
        counts={counts}
      />
    </nav>
  );
};
