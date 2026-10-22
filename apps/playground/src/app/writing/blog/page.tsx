import { findBooth } from "@/booths";
import { BlogList } from "@/components/booth/BlogList";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";
import { getBlogPosts, tagsOf } from "@/lib/hashnode";

const HREF = "/writing/blog";
const BLOG_URL = "https://terminal-knight.hashnode.dev/";

// Segment config must be a literal; keep in step with BLOG_REVALIDATE_SECONDS.
export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const BlogPage = async () => {
  const posts = await getBlogPosts();
  if (posts.length === 0) return <EntryBooth href={HREF} />;

  const booth = findBooth(HREF);

  return (
    <BoothPage>
      <BoothHeader command={`ls ~${HREF}`} title={booth?.title ?? "Blog"}>
        <p>
          Longer posts, published on{" "}
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener"
            className="text-amber underline decoration-[#4a3f37] underline-offset-4 transition-colors hover:text-accent"
          >
            my Hashnode blog
          </a>
          . Pick a tag to narrow them down.
        </p>
      </BoothHeader>
      <BlogList posts={posts} tags={tagsOf(posts)} />
    </BoothPage>
  );
};

export default BlogPage;
