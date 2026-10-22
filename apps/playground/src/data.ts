export interface ProjectLink {
  label: string;
  href: string;
  accent?: boolean;
}

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  links: ProjectLink[];
}

export interface NowItem {
  k: string;
  v: string;
}

export interface StackGroup {
  k: string;
  items: string[];
}

export const projects: Project[] = [
  {
    name: "personal-portfolio/",
    desc: "A unique, responsive and sleek site for presenting my work.",
    tags: ["React", "DaisyUI"],
    links: [
      {
        label: "source ↗",
        href: "https://github.com/AdrianTNare/my-playground",
        accent: true,
      },
    ],
  },
  {
    name: "forum-frontend/",
    desc: "A site letting users create, view and comment on forum posts.",
    tags: ["React", "DaisyUI"],
    links: [
      {
        label: "source ↗",
        href: "https://github.com/AdrianTNare/myblog-frontend",
        accent: true,
      },
      { label: "live ↗", href: "https://wayvy.vercel.app/" },
    ],
  },
  {
    name: "forum-backend/",
    desc: "A Java-based backend service powering the forum frontend.",
    tags: ["Java", "Spring Boot"],
    links: [
      {
        label: "source ↗",
        href: "https://github.com/AdrianTNare/MyBlog-Springboot-Backend",
        accent: true,
      },
      {
        label: "api ↗",
        href: "https://adn-myblog-backend-prod.up.railway.app/posts/all",
      },
    ],
  },
];

export const now: NowItem[] = [
  {
    k: "building",
    v: "A Next.js + TypeScript component library — fully tested with Vitest & React Testing Library.",
  },
  {
    k: "tinkering",
    v: "My Neovim config & Lua plugins. Always one keybinding deeper down the rabbit hole.",
  },
  {
    k: "open to",
    v: "Full-stack & front-end roles. Got a neat Vim trick? Even better.",
  },
];

export const stack: StackGroup[] = [
  {
    k: "front-end",
    items: ["React · Next.js · Svelte", "MUI · Chakra · Tailwind"],
  },
  { k: "back-end", items: ["Node.js · Express", "GraphQL · Spring Boot"] },
  { k: "testing / ci", items: ["Vitest · RTL", "Git · Docker"] },
];
