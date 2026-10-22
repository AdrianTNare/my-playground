import type { PostKind } from "@playground/contracts";
import { getPosts } from "@/lib/content";
import { EntryBooth } from "./EntryBooth";

interface PostsBoothProps {
  href: string;
  kind: PostKind;
}

/** TIL, reflections or bliki: newest first, each linking to its page. */
export const PostsBooth = async ({ href, kind }: PostsBoothProps) => {
  const posts = await getPosts(kind);
  const entries = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    date: post.date,
    href: `${href}/${post.slug}`,
    comingSoon: false,
  }));
  return <EntryBooth href={href} entries={entries} />;
};
