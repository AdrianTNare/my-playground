import { NowPageSchema } from "@playground/contracts";

export const nowPage = NowPageSchema.parse({
  updated: "2026-10-22",
  location: "Johannesburg, South Africa",
  sections: [
    {
      heading: "Work",
      paragraphs: [
        "I'm a full-stack product engineer at Littlefish, where I've been since July 2025. Day to day that means .NET services and React + TypeScript frontends on MongoDB and Postgres, shipped through GitHub Actions, Azure DevOps and Cloud Build.",
        "The part I care about most right now is what happens after merge: tests that catch real regressions (Vitest, React Testing Library, Playwright) and production monitoring that tells us something broke before a customer does.",
      ],
    },
    {
      heading: "Learning",
      paragraphs: [
        "Agentic coding tools, Claude Code and MCP servers in particular, and how to fit them into a team's workflow without losing the plot.",
        "Hono, Zod and Drizzle on side projects, including the API that will sit behind this site.",
      ],
    },
    {
      heading: "Tinkering",
      paragraphs: [
        "This playground, booth by booth.",
        "My Neovim config and Lua plugins. Always one keybinding deeper down the rabbit hole.",
      ],
    },
    {
      heading: "Open to",
      paragraphs: [
        "Conversations about full-stack work, testing and tooling; the unoffice hours booth is the easiest way in. Got a neat Vim trick? Even better.",
      ],
    },
  ],
});
