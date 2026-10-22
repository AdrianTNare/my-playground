"use client";

import { useState } from "react";

interface YouTubeFacadeProps {
  id: string;
  title: string;
}

/**
 * A thumbnail until clicked, then the real player: YouTube's embed is heavy
 * and sets cookies, so it only loads when the visitor asks for it.
 */
export const YouTubeFacade = ({ id, title }: YouTubeFacadeProps) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      data-nav-sound
      aria-label={`Play: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own CDN thumbnail */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="rounded-md border border-[#4a3f37] bg-ink/85 px-4 py-2.5 font-mono text-[13px] font-semibold text-bright transition-colors group-hover:border-accent group-hover:text-accent">
          ▶ play
        </span>
      </span>
    </button>
  );
};
