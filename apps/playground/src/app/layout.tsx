import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AccentPicker } from "@/components/AccentPicker";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { MobileBar } from "@/components/shell/MobileBar";
import { Providers } from "@/components/shell/Providers";
import { Sidebar } from "@/components/shell/Sidebar";
import { paletteLinks } from "@/lib/palette";
import { UI_STORAGE_KEY } from "@/stores/ui";
import { display, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Adrian Nare", template: "%s — Adrian Nare" },
  description:
    "Adrian Nare — full-stack engineer. A playground of booths: now, media reactions, reads, writing, projects and tinkering.",
};

// Applies the saved accent before first paint so a returning visitor never
// sees the default flash in; the store takes over once it rehydrates.
const accentScript = `try{var a=JSON.parse(localStorage.getItem(${JSON.stringify(
  UI_STORAGE_KEY,
)})||"null");a=a&&a.state&&a.state.accent;if(/^#[0-9a-f]{6}$/i.test(a))document.documentElement.style.setProperty("--accent",a)}catch(e){}`;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      data-theme="playground"
      className={`${mono.variable} ${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen bg-ink">
            <Sidebar />
            <div className="min-w-0 flex-1">
              <MobileBar />
              {children}
            </div>
          </div>
          <AccentPicker />
          <CommandPalette links={paletteLinks()} />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
