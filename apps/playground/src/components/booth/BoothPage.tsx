import type { ReactNode } from "react";

interface BoothPageProps {
  children: ReactNode;
}

export const BoothPage = ({ children }: BoothPageProps) => {
  return (
    <main className="mx-auto max-w-[940px] px-[clamp(18px,4vw,34px)] pt-[clamp(36px,6vw,72px)] pb-[clamp(64px,9vw,110px)]">
      {children}
    </main>
  );
};
