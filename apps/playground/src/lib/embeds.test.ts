import { describe, expect, it } from "vitest";
import { embedFor } from "./embeds";

describe("embedFor", () => {
  it.each([
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://www.youtube.com/shorts/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
  ])("finds the video id in %s", (url) => {
    expect(embedFor("youtube", url)).toEqual({
      kind: "youtube",
      id: "dQw4w9WgXcQ",
    });
  });

  it("embeds Spotify episodes", () => {
    expect(
      embedFor("podcast", "https://open.spotify.com/episode/abc123?si=x"),
    ).toEqual({
      kind: "spotify",
      src: "https://open.spotify.com/embed/episode/abc123",
    });
  });

  it("falls back to a link card for tweets, articles and odd URLs", () => {
    expect(embedFor("tweet", "https://x.com/someone/status/1")).toEqual({
      kind: "link",
      host: "x.com",
    });
    expect(embedFor("youtube", "https://www.youtube.com/@channel")).toEqual({
      kind: "link",
      host: "youtube.com",
    });
  });
});
