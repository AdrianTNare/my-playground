import type { PostKind } from "@playground/contracts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/booth/PostArticle";
import { getPost, getPosts } from "./content";

interface PostRouteProps {
  params: Promise<{ slug: string }>;
}

/** The three exports of a post detail route (TIL, reflection, bliki). */
export const postRoute = (kind: PostKind, href: string) => ({
  generateStaticParams: async () =>
    (await getPosts(kind)).map((post) => ({ slug: post.slug })),

  generateMetadata: async ({ params }: PostRouteProps): Promise<Metadata> => {
    const post = await getPost(kind, (await params).slug);
    return post ? { title: post.title, description: post.summary } : {};
  },

  Page: async ({ params }: PostRouteProps) => {
    const post = await getPost(kind, (await params).slug);
    if (!post) notFound();
    return <PostArticle href={href} post={post} />;
  },
});
