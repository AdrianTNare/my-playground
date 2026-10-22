import type { Metadata } from "next";
import { BoothHeader } from "@/components/booth/BoothHeader";
import { BoothPage } from "@/components/booth/BoothPage";
import { nowPage } from "@/content/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What Adrian Nare is working on and thinking about this season.",
};

const formatUpdated = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const NowPage = () => {
  return (
    <BoothPage>
      <BoothHeader command="cat now.md" title="Now">
        <p>
          What I&apos;d tell a friend I hadn&apos;t seen in a year. A{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener"
            className="text-amber underline decoration-[#4a3f37] underline-offset-4 transition-colors hover:text-accent"
          >
            now page
          </a>
          , in the spirit of Derek Sivers.
        </p>
      </BoothHeader>

      <dl className="mt-6 grid max-w-[68ch] grid-cols-[auto_1fr] gap-x-5 gap-y-1 font-mono text-[12.5px]">
        <dt className="text-muted">updated</dt>
        <dd className="text-[#d6c8b3]">
          <time dateTime={nowPage.updated}>
            {formatUpdated(nowPage.updated)}
          </time>
        </dd>
        <dt className="text-muted">from</dt>
        <dd className="text-[#d6c8b3]">{nowPage.location}</dd>
      </dl>

      <div className="mt-12 flex flex-col gap-11">
        {nowPage.sections.map((section) => (
          <section key={section.heading} className="max-w-[68ch]">
            <h2 className="font-mono text-[15px] font-semibold text-bright">
              <span className="text-sage">## </span>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3.5 font-mono text-[14.5px] leading-[1.8] text-[#d6c8b3]"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </BoothPage>
  );
};

export default NowPage;
