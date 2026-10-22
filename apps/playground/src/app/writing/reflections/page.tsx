import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";

const HREF = "/writing/reflections";

export const metadata = entryBoothMetadata(HREF);

const Page = () => <EntryBooth href={HREF} />;

export default Page;
