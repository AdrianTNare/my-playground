"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { BoothTree } from "./BoothTree";
import { SoundToggle } from "./SoundToggle";

const promptPath = (pathname: string) =>
  pathname === "/" ? "~" : `~${pathname}`;

export const MobileBar = () => {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#2f2722] bg-ink/85 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4 px-[clamp(18px,4vw,34px)] py-3">
          <Link
            href="/"
            data-nav-sound
            className="min-w-0 truncate font-mono text-[13px] font-semibold text-bright"
          >
            <span className="text-accent">{promptPath(pathname)}</span>
            <span className="text-muted"> $</span>
          </Link>
          <button
            type="button"
            onClick={open}
            data-nav-sound
            aria-haspopup="dialog"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-[#4a3f37] px-3.5 font-mono text-[13px] font-medium text-bright transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden>☰</span> booths
          </button>
        </div>
      </header>

      {/* Native modal dialog: focus trap, Esc to close and inert background for free. */}
      <dialog
        ref={dialogRef}
        aria-label="Booths"
        className="booths-dialog m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-body backdrop:bg-ink lg:hidden"
      >
        <div className="flex h-full flex-col px-[clamp(18px,4vw,34px)] py-3">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[13px] text-amber">
              $ tree booths/
            </span>
            <button
              type="button"
              onClick={close}
              data-nav-sound
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#4a3f37] px-3.5 font-mono text-[13px] font-medium text-bright transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden>✕</span> close
            </button>
          </div>
          <div className="mt-6 flex-1 overflow-y-auto">
            <BoothTree roomy onNavigate={close} />
          </div>
          <div className="border-t border-[#2a221d] py-4">
            <SoundToggle />
          </div>
        </div>
      </dialog>
    </>
  );
};
