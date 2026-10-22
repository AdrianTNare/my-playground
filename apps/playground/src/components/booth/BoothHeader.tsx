import type { ReactNode } from "react";

interface BoothHeaderProps {
  /** The shell command shown above the title, without the `$`. */
  command: string;
  title: string;
  children?: ReactNode;
}

export const BoothHeader = ({ command, title, children }: BoothHeaderProps) => {
  return (
    <header>
      <div className="font-mono text-[13px] text-amber">$ {command}</div>
      <h1 className="mt-4 font-display text-[clamp(32px,5.5vw,48px)] leading-[1.05] font-bold tracking-[-0.025em] text-bright">
        {title}
      </h1>
      {children && (
        <div className="mt-4 max-w-[68ch] font-mono text-[14.5px] leading-[1.75] text-clay">
          {children}
        </div>
      )}
    </header>
  );
};
