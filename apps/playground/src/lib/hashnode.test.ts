import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getBlogPosts, parseFeed, tagsOf } from "./hashnode";

// A snapshot of https://terminal-knight.hashnode.dev/rss.xml (Oct 2026).
const feed = readFileSync(
  new URL("./__fixtures__/hashnode-rss.xml", import.meta.url),
  "utf8",
);

describe("parseFeed", () => {
  const posts = parseFeed(feed);

  it("returns every post, newest first", () => {
    expect(posts.map((post) => post.slug)).toEqual([
      "no-more-finger-typing-gymnastics",
      "resolving-nextjs-publicenv-undefined-prod-issue",
    ]);
  });

  it("maps title, brief, link, date and tags from each item", () => {
    expect(posts[0]).toMatchObject({
      title: "No More Finger Typing Gymnastics",
      brief: "Home Row Mods for Mac Users",
      url: "https://terminal-knight.hashnode.dev/no-more-finger-typing-gymnastics",
      date: "2025-02-27",
      tags: ["ergonomic keyboards", "typing test", "keyboards", "ergonomics"],
    });
  });

  it("estimates read time from the full post text", () => {
    for (const post of posts)
      expect(post.readTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(posts[0].readTimeMinutes).toBeGreaterThan(posts[1].readTimeMinutes);
  });

  it("returns no posts for an empty feed", () => {
    expect(parseFeed("<rss><channel><title>x</title></channel></rss>")).toEqual(
      [],
    );
  });

  it("keeps number-like tags as strings", () => {
    const xml = `<rss><channel><item><title>T</title><description>D</description>
      <link>https://x.dev/t</link><pubDate>Mon, 16 Dec 2024 03:16:47 GMT</pubDate>
      <category>2024</category></item></channel></rss>`;
    expect(parseFeed(xml)[0].tags).toEqual(["2024"]);
  });
});

describe("tagsOf", () => {
  it("lists each tag once, alphabetically", () => {
    expect(tagsOf(parseFeed(feed))).toEqual([
      "azure-devops",
      "Docker",
      "Environment variables",
      "ergonomic keyboards",
      "ergonomics",
      "keyboards",
      "Next.js",
      "typing test",
    ]);
  });
});

describe("getBlogPosts when the feed is down", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("returns no posts during a build, so the placeholder shows", async () => {
    vi.stubEnv("NEXT_PHASE", "phase-production-build");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 503 })),
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});
    await expect(getBlogPosts()).resolves.toEqual([]);
  });

  it("throws during a background refresh, so the last good page stays", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );
    await expect(getBlogPosts()).rejects.toThrow("network down");
  });
});
