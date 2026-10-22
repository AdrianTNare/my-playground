import { EntrySchema, type Entry } from "@playground/contracts";

const PLACEHOLDER_DATE = "2026-10-22";

/** What each booth will hold, for its placeholder copy. */
const comingSoon: Record<string, string> = {
  "/media": "reaction to a video, podcast or post",
  "/reads/refs": "reference, with a note on why it's worth bookmarking",
  "/reads/bliki": "bliki entry",
  "/writing/til": "TIL",
  "/writing/reflections": "reflection",
  "/writing/blog": "blog post preview",
  "/tinkering/terminal": "tour of my terminal and Neovim setup",
  "/tinkering/toolset": "rundown of the tools in my daily rotation",
};

const placeholder = (href: string, what: string): Entry =>
  EntrySchema.parse({
    slug: `${href.slice(1).replaceAll("/", "-")}-coming-soon`,
    title: "coming soon",
    summary: `This booth is still being built. The first ${what} lands here soon.`,
    date: PLACEHOLDER_DATE,
    comingSoon: true,
  });

const entries: Record<string, Entry[]> = Object.fromEntries(
  Object.entries(comingSoon).map(([href, what]) => [
    href,
    [placeholder(href, what)],
  ]),
);

export const entriesFor = (href: string): Entry[] => entries[href] ?? [];
