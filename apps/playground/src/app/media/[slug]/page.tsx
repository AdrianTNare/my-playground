import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { Markdown } from "@/components/booth/Markdown";
import { MediaPreview } from "@/components/booth/MediaPreview";
import { getMediaReaction, getMediaReactions } from "@/lib/content";
import { formatLongDay } from "@/lib/dates";

interface MediaPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export const generateStaticParams = async () =>
  (await getMediaReactions()).map(({ slug }) => ({ slug }));

export const generateMetadata = async ({
  params,
}: MediaPageProps): Promise<Metadata> => {
  const reaction = await getMediaReaction((await params).slug);
  return reaction
    ? { title: reaction.title, description: reaction.summary }
    : {};
};

const MediaPage = async ({ params }: MediaPageProps) => {
  const reaction = await getMediaReaction((await params).slug);
  if (!reaction) notFound();

  return (
    <BoothPage>
      <Link
        href="/media"
        data-nav-sound
        className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
      >
        $ cd ..
      </Link>

      <article className="mt-6">
        <MediaPreview reaction={reaction} />

        <div className="mt-10">
          <BoothHeader
            command={`cat ~/media/${reaction.slug}.md`}
            title={reaction.title}
          >
            <p>{reaction.summary}</p>
          </BoothHeader>
        </div>

        <p className="mt-4 font-mono text-[12.5px] text-muted">
          reacted on{" "}
          <time dateTime={reaction.date} className="text-[#d6c8b3]">
            {formatLongDay(reaction.date)}
          </time>
        </p>

        <Markdown source={reaction.body} className="mt-10" />

        {reaction.takeaways.length > 0 && (
          <section className="mt-12 max-w-[68ch]">
            <h2 className="font-mono text-[15px] font-semibold text-bright">
              <span className="text-sage">## </span>Takeaways
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[14px] leading-[1.7] text-[#d6c8b3]">
              {reaction.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3">
                  <span aria-hidden className="text-sage">
                    +
                  </span>
                  {takeaway}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </BoothPage>
  );
};

export default MediaPage;
