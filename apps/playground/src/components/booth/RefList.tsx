import type { Ref } from "@playground/contracts";
import { Markdown } from "./Markdown";

interface RefListProps {
  refs: Ref[];
}

const host = (url: string) => new URL(url).host.replace(/^www\./, "");

/** Bookmarks: title out to the source, the domain, and why it's here. */
export const RefList = ({ refs }: RefListProps) => (
  <ul className="mt-10 divide-y divide-[#2f2722] overflow-hidden rounded-[10px] border border-edge bg-panel">
    {refs.map((ref) => (
      <li key={ref.slug} className="px-[clamp(18px,3vw,26px)] py-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="font-mono text-[16px] font-semibold text-bright">
            <a
              href={ref.url}
              target="_blank"
              rel="noopener"
              data-nav-sound
              className="rounded-sm transition-colors outline-offset-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              {ref.title} <span className="text-[13px] text-amber">↗</span>
            </a>
          </h2>
          <span className="font-mono text-[12px] text-muted">
            {host(ref.url)}
          </span>
        </div>
        <Markdown
          source={ref.note}
          className="mt-2 !text-[14px] !leading-[1.65] text-clay [&_p]:text-clay"
        />
        {ref.tags.length > 0 && (
          <p className="mt-2 font-mono text-[11px] text-[#6e6157]">
            {ref.tags.map((tag) => `#${tag}`).join(" ")}
          </p>
        )}
      </li>
    ))}
  </ul>
);
