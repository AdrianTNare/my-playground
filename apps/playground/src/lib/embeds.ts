import type { MediaSource } from "@playground/contracts";

export type Embed =
  | { kind: "youtube"; id: string }
  | { kind: "spotify"; src: string }
  | { kind: "link"; host: string };

const YOUTUBE_HOSTS = new Set(["youtube.com", "m.youtube.com", "youtu.be"]);

const youtubeId = (url: URL): string | null => {
  const host = url.host.replace(/^www\./, "");
  if (!YOUTUBE_HOSTS.has(host)) return null;
  if (host === "youtu.be") return url.pathname.slice(1) || null;
  if (url.pathname === "/watch") return url.searchParams.get("v");
  const [, kind, id] = url.pathname.split("/");
  return ["embed", "shorts", "live"].includes(kind) && id ? id : null;
};

/**
 * How to preview a reaction's source: an inline player where the platform
 * allows one, otherwise a link card. Tweets stay a link card on purpose;
 * the embed script tracks visitors.
 */
export const embedFor = (source: MediaSource, sourceUrl: string): Embed => {
  const url = new URL(sourceUrl);
  const id = source === "youtube" ? youtubeId(url) : null;
  if (id && /^[\w-]{6,}$/.test(id)) return { kind: "youtube", id };

  if (url.host === "open.spotify.com") {
    const [, type, spotifyId] = url.pathname.split("/");
    if (["episode", "show", "track"].includes(type) && spotifyId) {
      return {
        kind: "spotify",
        src: `https://open.spotify.com/embed/${type}/${spotifyId}`,
      };
    }
  }

  return { kind: "link", host: url.host.replace(/^www\./, "") };
};
