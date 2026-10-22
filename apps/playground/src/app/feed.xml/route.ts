import { getMediaReactions, getPosts } from "@/lib/content";
import { renderFeed, type FeedItem } from "@/lib/feed";
import { renderMarkdown } from "@/lib/markdown";

export const revalidate = 3600;

const SITE_URL =
  process.env.SITE_URL ?? process.env.URL ?? "https://adriannare.netlify.app";

const POST_BOOTHS = [
  { kind: "til", href: "/writing/til", category: "til" },
  { kind: "reflection", href: "/writing/reflections", category: "reflection" },
  { kind: "bliki", href: "/reads/bliki", category: "bliki" },
] as const;

/** TILs, reflections, bliki entries and media reactions in one feed. */
export const GET = async () => {
  const [media, ...posts] = await Promise.all([
    getMediaReactions(),
    ...POST_BOOTHS.map(({ kind }) => getPosts(kind)),
  ]);

  const postItems = POST_BOOTHS.flatMap(({ href, category }, i) =>
    posts[i].map(async (post): Promise<FeedItem> => ({
      title: post.title,
      url: new URL(`${href}/${post.slug}`, SITE_URL).href,
      date: post.date,
      summary: post.summary,
      html: await renderMarkdown(post.body),
      category,
    })),
  );
  const mediaItems = media.map(async (reaction): Promise<FeedItem> => ({
    title: reaction.title,
    url: new URL(`/media/${reaction.slug}`, SITE_URL).href,
    date: reaction.date,
    summary: reaction.summary,
    html: `<p>Reacting to <a href="${reaction.sourceUrl}">${reaction.by}</a>.</p>${await renderMarkdown(reaction.body)}`,
    category: "media",
  }));

  const xml = renderFeed({
    title: "Adrian Nare",
    siteUrl: SITE_URL,
    feedUrl: new URL("/feed.xml", SITE_URL).href,
    description:
      "TILs, reflections, bliki entries and media reactions from Adrian Nare's playground.",
    items: await Promise.all([...postItems, ...mediaItems]),
  });

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
};
