import { entryBoothMetadata } from "@/components/booth/EntryBooth";
import { PostsBooth } from "@/components/booth/PostsBooth";

const HREF = "/reads/bliki";

export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const Page = () => <PostsBooth href={HREF} kind="bliki" />;

export default Page;
