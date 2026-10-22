import { Contact } from "@/components/Contact";
import { ExploreBooths } from "@/components/ExploreBooths";
import { Hero } from "@/components/Hero";

const Page = () => {
  return (
    <main className="mx-auto max-w-[940px] px-[clamp(18px,4vw,34px)]">
      <Hero />
      <ExploreBooths />
      <Contact />
    </main>
  );
};

export default Page;
