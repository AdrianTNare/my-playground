import type { Metadata } from "next";
import { ViewTransition, type ReactNode } from "react";
import { AccentPicker } from "@/components/AccentPicker";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { MobileBar } from "@/components/shell/MobileBar";
import { Providers } from "@/components/shell/Providers";
import { Sidebar } from "@/components/shell/Sidebar";
import { paletteLinks } from "@/lib/palette";
import { UI_STORAGE_KEY } from "@/stores/ui";
import { display, mono, sans } from "./fonts";
import "./globals.css";

// Netlify sets URL to the site's main address at build time.
const SITE_URL =
  process.env.SITE_URL ?? process.env.URL ?? "https://adriannare.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Adrian Nare", template: "%s — Adrian Nare" },
  openGraph: { siteName: "Adrian Nare", type: "website" },
  twitter: { card: "summary_large_image" },
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

const RootLayout = async ({ children }: RootLayoutProps) => {
  const links = await paletteLinks();

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
              {/* The one motion between booths: the content panel swaps
                  (see .booth-swap in globals.css); the shell stays put. */}
              <ViewTransition update="booth-swap" default="none">
                <div>{children}</div>
              </ViewTransition>
            </div>
          </div>
          <AccentPicker />
          <CommandPalette links={links} />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
