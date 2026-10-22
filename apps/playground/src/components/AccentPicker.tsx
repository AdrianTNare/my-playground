"use client";

import { useUiStore } from "@/stores/ui";

export const ACCENT_OPTIONS = [
  { name: "terracotta", value: "#c0613f" },
  { name: "amber", value: "#cf9b5c" },
  { name: "sage", value: "#8a9a6d" },
  { name: "clay", value: "#b0764f" },
];

export const AccentPicker = () => {
  const accent = useUiStore((state) => state.accent);
  const setAccent = useUiStore((state) => state.setAccent);

  return (
    <div className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-2 shadow-lg">
      <span className="hidden font-mono text-[10px] text-muted sm:inline">
        accent
      </span>
      {ACCENT_OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setAccent(o.value)}
          title={o.name}
          aria-label={o.name}
          aria-pressed={accent === o.value}
          data-nav-sound
          className="h-4 w-4 rounded-full border border-black/30"
          style={{
            background: o.value,
            outline: accent === o.value ? "2px solid #f3e9d8" : "none",
            outlineOffset: "1px",
          }}
        />
      ))}
    </div>
  );
};
