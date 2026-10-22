import type { Metadata } from "next";
import type { ReactNode } from "react";
import { display, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adrian Nare",
  description:
    "Adrian Nare — full-stack JavaScript / TypeScript developer, Vim enthusiast and Computer Science graduate.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      data-theme="playground"
      className={`${mono.variable} ${display.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
