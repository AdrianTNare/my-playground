"use client";

import { useUiStore } from "@/stores/ui";

export const SoundToggle = () => {
  const muted = useUiStore((state) => state.muted);
  const toggleMuted = useUiStore((state) => state.toggleMuted);

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={!muted}
      data-nav-sound
      className="font-mono text-[12px] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    >
      sound:{" "}
      <span className={muted ? "text-muted" : "text-sage"}>
        {muted ? "off" : "on"}
      </span>
    </button>
  );
};
