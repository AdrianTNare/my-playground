import { ProjectSchema, type Project } from "@playground/contracts";

export const projects: Project[] = ProjectSchema.array().parse([
  {
    slug: "my-playground",
    name: "my-playground",
    summary: "This site: a playground of booths with a terminal accent.",
    description:
      "A pnpm monorepo holding this site (Next.js, Tailwind and daisyUI), with a Payload CMS and a Hono API on the way. It started life as a single-page portfolio and grew booths.",
    tags: ["Next.js", "TypeScript", "Tailwind", "daisyUI"],
    links: [
      { kind: "source", href: "https://github.com/AdrianTNare/my-playground" },
    ],
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
]);

export const findProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
