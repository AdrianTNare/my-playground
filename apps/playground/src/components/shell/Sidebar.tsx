import Link from "next/link";
import type { BoothCounts } from "@/lib/counts";
import { BoothTree } from "./BoothTree";
import { PaletteHint } from "./PaletteHint";
import { SoundToggle } from "./SoundToggle";

interface SidebarProps {
  counts: BoothCounts;
}

export const Sidebar = ({ counts }: SidebarProps) => {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-[#2a221d] px-6 py-7 lg:flex">
      <Link
        href="/"
        data-nav-sound
        className="font-mono text-[13px] font-semibold text-bright"
      >
        adrian@nare<span className="text-muted">:</span>
        <span className="text-accent">~</span>
        <span className="text-muted">$</span>{" "}
        <span className="font-normal text-amber">tree</span>
      </Link>
      <div className="mt-5 flex-1 overflow-y-auto">
        <BoothTree vimKeys counts={counts} />
      </div>
      <div className="flex flex-col items-start gap-2 border-t border-[#2a221d] pt-4">
        <SoundToggle />
        <p className="font-mono text-[11px] text-[#6e6157]">
          <kbd className="text-muted">j</kbd>/
          <kbd className="text-muted">k</kbd> to move,{" "}
          <kbd className="text-muted">enter</kbd> to open
        </p>
        <PaletteHint />
        <a
          href="/feed.xml"
          data-nav-sound
          className="font-mono text-[11px] text-[#6e6157] transition-colors hover:text-accent"
        >
          rss <span className="text-muted">/feed.xml</span>
        </a>
      </div>
    </aside>
  );
};
