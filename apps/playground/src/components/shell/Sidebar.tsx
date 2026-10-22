import Link from "next/link";
import { BoothTree } from "./BoothTree";
import { SoundToggle } from "./SoundToggle";

export const Sidebar = () => {
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
        <BoothTree />
      </div>
      <div className="border-t border-[#2a221d] pt-4">
        <SoundToggle />
      </div>
    </aside>
  );
};
