"use client";

import "asciinema-player/dist/bundle/asciinema-player.css";
import { useEffect, useRef } from "react";

interface CastPlayerProps {
  src: string;
  title: string;
}

/** Plays an asciinema recording, themed in the site palette. */
export const CastPlayer = ({ src, title }: CastPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // asciinema-player is an imperative widget: it has to be mounted into a
  // DOM node after render and disposed when the component goes away.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let player: { dispose(): void } | undefined;
    let cancelled = false;

    void import("asciinema-player").then(({ create }) => {
      if (cancelled) return;
      player = create(src, container, {
        theme: "playground",
        fit: "width",
        idleTimeLimit: 1.5,
        poster: "npt:0:3",
        terminalFontFamily: "var(--font-jetbrains-mono), monospace",
      });
    });

    return () => {
      cancelled = true;
      player?.dispose();
    };
  }, [src]);

  return (
    <figure className="overflow-hidden rounded-xl border border-edge bg-panel">
      <figcaption className="border-b border-edge bg-panel2 px-[15px] py-[11px] font-mono text-[11px] text-muted">
        {title}: recorded session
      </figcaption>
      <div ref={containerRef} data-cast={src} />
    </figure>
  );
};
