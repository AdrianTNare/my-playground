import { ProjectSchema, type Project } from "@playground/contracts";

export const projects: Project[] = ProjectSchema.array().parse([
  {
    slug: "my-playground",
    name: "my-playground",
    summary: "This site: a playground of booths with a terminal accent.",
    description:
      "A pnpm monorepo holding this site (Next.js, Tailwind and daisyUI), a Payload CMS for the booth content and a Hono API. It started life as a single-page portfolio and grew booths, a ⌘K palette, vim keys and click sounds.",
    tags: ["Next.js", "TypeScript", "Payload", "Hono", "Tailwind"],
    links: [
      { kind: "source", href: "https://github.com/AdrianTNare/my-playground" },
      { kind: "live", href: "https://adriannare.netlify.app/" },
    ],
    preview: "/projects/my-playground.webp",
    cast: "/casts/my-playground-api.cast",
  },
  {
    slug: "forum-frontend",
    name: "forum-frontend",
    summary: "A site letting users create, view and comment on forum posts.",
    description:
      "The React frontend for a small forum: sign in, write posts, read them and comment. Pairs with forum-backend.",
    tags: ["React", "DaisyUI"],
    links: [
      {
        kind: "source",
        href: "https://github.com/AdrianTNare/myblog-frontend",
      },
      { kind: "live", href: "https://wayvy.vercel.app/" },
    ],
  },
  {
    slug: "forum-backend",
    name: "forum-backend",
    summary: "A Java-based backend service powering the forum frontend.",
    description:
      "A Spring Boot REST API serving posts and comments for forum-frontend, deployed on Railway.",
    tags: ["Java", "Spring Boot"],
    links: [
      {
        kind: "source",
        href: "https://github.com/AdrianTNare/MyBlog-Springboot-Backend",
      },
      {
        kind: "api",
        href: "https://adn-myblog-backend-prod.up.railway.app/posts/all",
      },
    ],
  },
  {
    slug: "homerow-mods",
    name: "homerow-mods",
    summary: "Home-row modifiers on macOS with Karabiner-Elements.",
    description:
      "A Karabiner-Elements config that turns the home row into modifiers when held: hold a, s, d or f for command, option, shift or control, tap them to type as usual. Written up on the blog as \"No More Finger Typing Gymnastics\".",
    tags: ["Karabiner-Elements", "macOS", "Keyboards"],
    links: [
      {
        kind: "source",
        href: "https://github.com/AdrianTNare/homerow-mods-blog-post",
      },
      {
        kind: "live",
        href: "https://terminal-knight.hashnode.dev/no-more-finger-typing-gymnastics",
      },
    ],
  },
  {
    slug: "advent-of-code",
    name: "advent-of-code",
    summary: "Solutions to Advent of Code puzzles in JavaScript.",
    description:
      "A collection of solutions to the yearly Advent of Code puzzles, written in plain JavaScript. Mostly an excuse to practise parsing and algorithms in December.",
    tags: ["JavaScript", "Algorithms"],
    links: [
      { kind: "source", href: "https://github.com/AdrianTNare/AdventOfCode" },
    ],
  },
  {
    slug: "learn-to-write",
    name: "learn-to-write",
    summary: "An iOS app that teaches kids to write letters and numbers.",
    description:
      "A Swift iOS app aimed at helping children learn to write their letters and numbers.",
    tags: ["Swift", "iOS"],
    links: [
      {
        kind: "source",
        href: "https://github.com/AdrianTNare/learnToWriteApp",
      },
    ],
  },
]);

export const findProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
