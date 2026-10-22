import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";
import { RefList } from "@/components/booth/RefList";
import { getRefs } from "@/lib/content";

const HREF = "/reads/refs";

export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const Page = async () => {
  const refs = await getRefs();
  return (
    <EntryBooth href={HREF}>
      {refs.length > 0 ? <RefList refs={refs} /> : undefined}
    </EntryBooth>
  );
};

export default Page;
