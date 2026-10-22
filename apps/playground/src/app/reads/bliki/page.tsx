import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";

const HREF = "/reads/bliki";

export const metadata = entryBoothMetadata(HREF);

const Page = () => <EntryBooth href={HREF} />;

export default Page;
