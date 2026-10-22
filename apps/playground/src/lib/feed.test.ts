import { XMLParser } from "fast-xml-parser";
import { describe, expect, it } from "vitest";
import { renderFeed, type FeedItem } from "./feed";

const item = (overrides: Partial<FeedItem>): FeedItem => ({
  title: "A & B <tricky>",
  url: "https://example.com/writing/til/a",
  date: "2026-10-20",
  summary: "Summary",
  html: "<p>Body with ]]> inside</p>",
  category: "til",
  ...overrides,
});

const parse = (xml: string) =>
  new XMLParser({ isArray: (name) => name === "item" }).parse(xml).rss.channel;

describe("renderFeed", () => {
  it("is valid XML with escaped titles and intact HTML bodies", () => {
    const channel = parse(
      renderFeed({
        title: "Adrian",
        siteUrl: "https://example.com",
        feedUrl: "https://example.com/feed.xml",
        description: "Feed",
        items: [item({})],
      }),
    );
    expect(channel.item[0].title).toBe("A & B <tricky>");
    expect(channel.item[0]["content:encoded"]).toBe(
      "<p>Body with ]]> inside</p>",
    );
  });

  it("lists items newest first", () => {
    const channel = parse(
      renderFeed({
        title: "Adrian",
        siteUrl: "https://example.com",
        feedUrl: "https://example.com/feed.xml",
        description: "Feed",
        items: [
          item({ title: "old", date: "2026-01-01", url: "https://e.com/1" }),
          item({ title: "new", date: "2026-10-01", url: "https://e.com/2" }),
        ],
      }),
    );
    expect(channel.item.map((i: { title: string }) => i.title)).toEqual([
      "new",
      "old",
    ]);
  });
});
