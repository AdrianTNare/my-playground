import type { MediaReaction } from "@playground/contracts";
import { embedFor } from "@/lib/embeds";
import { YouTubeFacade } from "./YouTubeFacade";

interface MediaPreviewProps {
  reaction: MediaReaction;
}

/** The thing being reacted to, framed like a terminal pane. */
export const MediaPreview = ({ reaction }: MediaPreviewProps) => {
  const embed = embedFor(reaction.source, reaction.sourceUrl);

  return (
    <figure className="overflow-hidden rounded-xl border border-edge bg-panel">
      <figcaption className="flex items-center justify-between gap-4 border-b border-edge bg-panel2 px-[15px] py-[11px] font-mono text-[11px] text-muted">
        <span>
          {reaction.source} · {reaction.by}
        </span>
        <a
          href={reaction.sourceUrl}
          target="_blank"
          rel="noopener"
          data-nav-sound
          className="text-amber transition-colors hover:text-accent"
        >
          open ↗
        </a>
      </figcaption>

      {embed.kind === "youtube" && (
        <YouTubeFacade id={embed.id} title={reaction.title} />
      )}
      {embed.kind === "spotify" && (
        <iframe
          src={embed.src}
          title={reaction.title}
          loading="lazy"
          allow="encrypted-media"
          className="h-[152px] w-full"
        />
      )}
      {embed.kind === "link" && (
        <a
          href={reaction.sourceUrl}
          target="_blank"
          rel="noopener"
          data-nav-sound
          className="group block px-[clamp(18px,3vw,26px)] py-6 font-mono"
        >
          <span className="text-[13px] text-amber">$ open {embed.host}</span>
          <span className="mt-2 block text-[17px] font-semibold text-bright transition-colors group-hover:text-accent">
            {reaction.title} ↗
          </span>
        </a>
      )}
    </figure>
  );
};
