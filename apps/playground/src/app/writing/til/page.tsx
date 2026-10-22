import { entryBoothMetadata } from "@/components/booth/EntryBooth";
import { PostsBooth } from "@/components/booth/PostsBooth";

const HREF = "/writing/til";

export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const Page = () => <PostsBooth href={HREF} kind="til" />;

export default Page;
