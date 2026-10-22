import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";
import { getMediaReactions } from "@/lib/content";

const HREF = "/media";

export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const Page = async () => {
  const reactions = await getMediaReactions();
  const entries = reactions.map((reaction) => ({
    slug: reaction.slug,
    title: reaction.title,
    summary: `${reaction.source} · ${reaction.by} — ${reaction.summary}`,
    date: reaction.date,
    href: `${HREF}/${reaction.slug}`,
    comingSoon: false,
  }));
  return <EntryBooth href={HREF} entries={entries} />;
};

export default Page;
