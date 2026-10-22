"use client";

import { openPalette } from "./CommandPalette";

export const PaletteHint = () => (
  <button
    type="button"
    onClick={openPalette}
    data-nav-sound
    aria-haspopup="dialog"
    className="font-mono text-[11px] text-[#6e6157] transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
  >
    <kbd className="text-muted">⌘K</kbd> or <kbd className="text-muted">/</kbd>{" "}
    to find anything
  </button>
);
