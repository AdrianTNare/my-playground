import type { Entry } from "@playground/contracts";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatDay } from "@/lib/dates";

interface EntryListProps {
  entries: Entry[];
}

interface EntryTitleProps {
  entry: Entry;
}

const titleLink =
  "rounded-sm transition-colors outline-offset-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent";

const EntryTitle = ({ entry }: EntryTitleProps): ReactNode => {
  if (!entry.href) return entry.title;
  if (/^https?:/.test(entry.href)) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener"
        data-nav-sound
        className={titleLink}
      >
        {entry.title} <span className="text-[13px] text-amber">↗</span>
      </a>
    );
  }
  return (
    <Link href={entry.href} data-nav-sound className={titleLink}>
      {entry.title}
    </Link>
  );
};

export const EntryList = ({ entries }: EntryListProps) => {
  return (
    <ul className="mt-10 divide-y divide-[#2f2722] overflow-hidden rounded-[10px] border border-edge bg-panel">
      {entries.map((entry) => (
        <li
          key={entry.slug}
          className="grid gap-x-6 gap-y-1.5 px-[clamp(18px,3vw,26px)] py-5 sm:grid-cols-[112px_1fr]"
        >
          <time
            dateTime={entry.date}
            className="pt-[3px] font-mono text-[12px] text-muted"
          >
            {formatDay(entry.date)}
          </time>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-mono text-[17px] font-semibold text-bright">
                <EntryTitle entry={entry} />
              </h2>
              {entry.comingSoon && (
                <span className="rounded-[5px] border border-[#4a3f37] px-2 py-0.5 font-mono text-[11px] text-amber">
                  wip
                </span>
              )}
            </div>
            <p className="mt-2 max-w-[68ch] font-mono text-[14px] leading-[1.65] text-clay">
              {entry.summary}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
