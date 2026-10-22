import localFont from "next/font/local";

// Variable latin subsets (SIL OFL) from Fontsource, committed so builds
// never download fonts. Each file covers every weight the site uses.
export const mono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
});

export const display = localFont({
  src: "./fonts/space-grotesk.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
});

export const sans = localFont({
  src: "./fonts/hanken-grotesk.woff2",
  weight: "100 900",
  variable: "--font-hanken-grotesk",
});
