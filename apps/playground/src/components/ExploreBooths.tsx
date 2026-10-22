import Link from "next/link";
import { booths } from "@/booths";

const listed = booths.filter((booth) => booth.href !== "/");

export const ExploreBooths = () => {
  return (
    <section
      aria-labelledby="explore-heading"
      className="pb-[clamp(40px,6vw,64px)]"
    >
      <div className="overflow-hidden rounded-xl border border-edge bg-panel">
        <div className="flex items-center gap-2 border-b border-edge bg-panel2 px-[15px] py-[11px]">
          <span className="font-mono text-[11px] text-muted">
            adrian@nare: ~/playground
          </span>
        </div>
        <div className="px-[clamp(22px,4vw,46px)] py-[clamp(24px,4vw,36px)]">
          <h2
            id="explore-heading"
            className="font-display text-[clamp(22px,3.4vw,30px)] font-semibold tracking-[-0.01em] text-bright"
          >
            This site is a playground. Have a look around.
          </h2>
          <p className="mt-3 max-w-[60ch] font-mono text-[14px] leading-[1.7] text-clay">
            Each booth holds something different: what I&apos;m up to, reactions
            to things I&apos;ve watched, notes, projects and my setup. Pick one.
          </p>

          <div className="mt-7 font-mono text-[13px] text-amber">
            $ ls booths/
          </div>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {listed.map((booth) => (
              <li key={booth.name}>
                <Link
                  href={booth.href}
                  data-nav-sound
                  className="group flex min-h-11 flex-col justify-center rounded-md py-2 outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="font-mono text-[15px] font-semibold text-bright transition-colors group-hover:text-accent">
                    {booth.children ? `${booth.name}/` : booth.name}
                  </span>
                  <span className="mt-0.5 font-mono text-[12.5px] leading-[1.55] text-muted">
                    {booth.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
