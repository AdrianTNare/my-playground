import { getPost, getPosts } from "@/lib/content";
import { ogImage } from "@/og/render";

export const alt = "A post by Adrian Nare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = async () =>
  (await getPosts("til")).map((post) => ({ slug: post.slug }));

interface ImageProps {
  params: Promise<{ slug: string }>;
}

const Image = async ({ params }: ImageProps) => {
  const { slug } = await params;
  const post = await getPost("til", slug);
  return ogImage({
    command: `cat ~/writing/til/${slug}.md`,
    title: post?.title ?? slug,
    description: post?.summary ?? "",
  });
};

export default Image;
