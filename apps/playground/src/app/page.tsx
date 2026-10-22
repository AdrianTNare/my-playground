import { About } from "@/components/About";
import { AccentPicker } from "@/components/AccentPicker";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Now } from "@/components/Now";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";

const Page = () => {
  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main className="mx-auto max-w-[940px] px-[clamp(18px,4vw,34px)]">
        <Hero />
        <Now />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>
      <AccentPicker />
    </div>
  );
};

export default Page;
