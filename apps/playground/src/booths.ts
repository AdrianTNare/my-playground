export interface Booth {
  /** Name shown in the tree; groups end in `/` when rendered. */
  name: string;
  /** Heading on the booth's own page. */
  title: string;
  href: string;
  /** One sentence for the home page's `ls booths/` listing and the booth header. */
  description: string;
  children?: Booth[];
}

export const booths: Booth[] = [
  { name: "home", title: "Home", href: "/", description: "Where you are now." },
  {
    name: "now",
    title: "Now",
    href: "/now",
    description: "What I'm working on and thinking about this season.",
  },
  {
    name: "unoffice-hours",
    title: "Unoffice hours",
    href: "/unoffice-hours",
    description:
      "Book a 30-minute call to talk shop, or nothing in particular.",
  },
  {
    name: "media",
    title: "Media",
    href: "/media",
    description:
      "Short reactions to videos, podcasts and posts worth your time.",
  },
  {
    name: "reads",
    title: "Reads",
    href: "/reads/refs",
    description: "References I keep coming back to, and a bliki.",
    children: [
      {
        name: "refs",
        title: "Refs",
        href: "/reads/refs",
        description:
          "Official docs and good references, with a note on why each one.",
      },
      {
        name: "bliki",
        title: "Bliki",
        href: "/reads/bliki",
        description:
          "Half blog, half wiki: ideas that get revised instead of replaced.",
      },
    ],
  },
  {
    name: "writing",
    title: "Writing",
    href: "/writing/til",
    description: "Things learned, things mulled over, and the blog.",
    children: [
      {
        name: "til",
        title: "TIL",
        href: "/writing/til",
        description: "Small things learned, written down fast.",
      },
      {
        name: "reflections",
        title: "Random reflections",
        href: "/writing/reflections",
        description: "Random reflections that didn't need to be a full post.",
      },
      {
        name: "blog",
        title: "Blog",
        href: "/writing/blog",
        description: "Longer posts, published on my blog.",
      },
    ],
  },
  {
    name: "projects",
    title: "Projects",
    href: "/projects",
    description: "Things I've built, with source and live links.",
  },
  {
    name: "tinkering",
    title: "Tinkering",
    href: "/tinkering/terminal",
    description: "My terminal setup and the tools I reach for.",
    children: [
      {
        name: "terminal",
        title: "Terminal",
        href: "/tinkering/terminal",
        description:
          "Shell, Neovim and the config that never quite gets finished.",
      },
      {
        name: "toolset",
        title: "Toolset",
        href: "/tinkering/toolset",
        description: "The apps and tools in my daily rotation.",
      },
    ],
  },
];

/** Every leaf booth, in tree order — the pages that actually exist. */
export const leafBooths: Booth[] = booths.flatMap(
  (booth) => booth.children ?? [booth],
);

export const findBooth = (href: string): Booth | undefined =>
  leafBooths.find((booth) => booth.href === href);

/** Active when on the booth itself or one of its detail pages. */
export const isActive = (pathname: string, href: string): boolean =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
