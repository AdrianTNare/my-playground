import type { Post } from "@playground/contracts";
import Link from "next/link";
import { formatLongDay } from "@/lib/dates";
import { BoothHeader } from "./BoothHeader";
import { BoothPage } from "./BoothPage";
import { Markdown } from "./Markdown";

interface PostArticleProps {
  /** The booth the post belongs to, e.g. /writing/til. */
  href: string;
  post: Post;
}

export const PostArticle = ({ href, post }: PostArticleProps) => (
  <BoothPage>
    <Link
      href={href}
      data-nav-sound
      className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
    >
      $ cd ..
    </Link>

    <article className="mt-6">
      <BoothHeader command={`cat ~${href}/${post.slug}.md`} title={post.title}>
        <p>{post.summary}</p>
      </BoothHeader>

      <dl className="mt-6 grid max-w-[68ch] grid-cols-[auto_1fr] gap-x-5 gap-y-1 font-mono text-[12.5px]">
        <dt className="text-muted">written</dt>
        <dd className="text-[#d6c8b3]">
          <time dateTime={post.date}>{formatLongDay(post.date)}</time>
        </dd>
        {post.updated && (
          <>
            <dt className="text-muted">revised</dt>
            <dd className="text-[#d6c8b3]">
              <time dateTime={post.updated}>{formatLongDay(post.updated)}</time>
            </dd>
          </>
        )}
        {post.tags.length > 0 && (
          <>
            <dt className="text-muted">tags</dt>
            <dd className="text-clay">{post.tags.join(" · ")}</dd>
          </>
        )}
      </dl>

      <Markdown source={post.body} className="mt-12" />
    </article>
  </BoothPage>
);
