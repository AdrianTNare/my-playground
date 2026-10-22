import { BlogPostSchema, type BlogPost } from "@playground/contracts";
import { XMLParser } from "fast-xml-parser";

// Hashnode's GraphQL API needs a paid plan; the RSS feed is free and has
// everything a preview needs (see issue #29).
const DEFAULT_FEED_URL = "https://terminal-knight.hashnode.dev/rss.xml";
const WORDS_PER_MINUTE = 200;

export const BLOG_REVALIDATE_SECONDS = 3600;

const parser = new XMLParser({
  // The cover image lives in <enclosure url="…">.
  ignoreAttributes: false,
  attributeNamePrefix: "",
  // Keep every value a string: a tag like "2024" must not become a number.
  parseTagValue: false,
  isArray: (name) => name === "item" || name === "category",
});

interface FeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string[];
  enclosure?: { url?: string; type?: string };
  "content:encoded"?: string;
}

const readTime = (html: string) => {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

/** Turns the RSS feed into validated posts, newest first. */
export const parseFeed = (xml: string): BlogPost[] => {
  const items: FeedItem[] = parser.parse(xml)?.rss?.channel?.item ?? [];

  const posts = items.map((item) =>
    BlogPostSchema.parse({
      slug: new URL(item.link).pathname.split("/").filter(Boolean).at(-1),
      title: item.title,
      brief: item.description,
      url: item.link,
      date: new Date(item.pubDate).toISOString().slice(0, 10),
      coverImage: item.enclosure?.type?.startsWith("image/")
        ? item.enclosure.url
        : undefined,
      readTimeMinutes: readTime(item["content:encoded"] ?? item.description),
      tags: item.category ?? [],
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

/** Every tag used across the posts, alphabetically. */
export const tagsOf = (posts: BlogPost[]): string[] =>
  [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  );

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

/**
 * Fetches the blog's posts, refreshed at most hourly.
 *
 * At build time a failure returns [] so the booth falls back to its
 * coming-soon entry and the build still succeeds. During a background
 * refresh it throws, so Next keeps serving the last good page.
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const url = process.env.HASHNODE_RSS_URL ?? DEFAULT_FEED_URL;

  try {
    const res = await fetch(url, {
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Blog feed returned ${res.status}`);
    return parseFeed(await res.text());
  } catch (error) {
    if (!isBuild()) throw error;
    console.warn(
      `[blog] Could not load ${url}, showing the placeholder:`,
      error,
    );
    return [];
  }
};
