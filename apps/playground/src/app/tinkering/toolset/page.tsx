import { EntryBooth, entryBoothMetadata } from "@/components/booth/EntryBooth";
import { ToolList } from "@/components/booth/ToolList";
import { getTools } from "@/lib/content";

const HREF = "/tinkering/toolset";

export const revalidate = 3600;

export const metadata = entryBoothMetadata(HREF);

const Page = async () => {
  const tools = await getTools("toolset");
  return (
    <EntryBooth href={HREF}>
      {tools.length > 0 ? <ToolList tools={tools} /> : undefined}
    </EntryBooth>
  );
};

export default Page;
