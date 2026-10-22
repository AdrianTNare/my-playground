import type { Tool } from "@playground/contracts";
import { Markdown } from "./Markdown";

interface ToolListProps {
  tools: Tool[];
}

interface ToolRowProps {
  tool: Tool;
}

const ToolRow = ({ tool }: ToolRowProps) => (
  <li className="px-[clamp(18px,3vw,26px)] py-5">
    <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[180px_1fr]">
      <h3 className="font-mono text-[15px] font-semibold text-bright">
        {tool.url ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener"
            data-nav-sound
            className="rounded-sm transition-colors outline-offset-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            {tool.name} <span className="text-[12px] text-amber">↗</span>
          </a>
        ) : (
          tool.name
        )}
      </h3>
      <p className="max-w-[60ch] font-mono text-[14px] leading-[1.65] text-clay">
        {tool.why}
      </p>
    </div>
    {tool.details && (
      // Native disclosure: keyboard and screen-reader friendly, no state.
      <details className="group mt-3 sm:ml-[204px]">
        <summary className="w-fit cursor-pointer list-none rounded-sm font-mono text-[12px] text-amber transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
          <span className="inline-block w-3 transition-transform group-open:rotate-90">
            ›
          </span>
          cat {tool.slug}.md
        </summary>
        <Markdown source={tool.details} className="mt-4 !text-[13.5px]" />
      </details>
    )}
  </li>
);

/** Tools grouped by category, in the order the categories first appear. */
export const ToolList = ({ tools }: ToolListProps) => {
  const groups = Map.groupBy(tools, (tool) => tool.category);

  return (
    <div className="mt-10 flex flex-col gap-9">
      {[...groups].map(([category, items]) => (
        <section key={category}>
          <h2 className="font-mono text-[13px] font-semibold text-bright">
            <span className="text-sage">## </span>
            {category}
          </h2>
          <ul className="mt-3 divide-y divide-[#2f2722] overflow-hidden rounded-[10px] border border-edge bg-panel">
            {items.map((tool) => (
              <ToolRow key={tool.slug} tool={tool} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
