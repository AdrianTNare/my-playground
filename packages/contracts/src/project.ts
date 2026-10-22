import { z } from "zod";

export const ProjectLinkSchema = z.object({
  kind: z.enum(["source", "live", "api"]),
  href: z.url(),
});
export type ProjectLink = z.infer<typeof ProjectLinkSchema>;

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  links: z.array(ProjectLinkSchema),
  /** Path or URL of a screenshot; absent until one exists. */
  preview: z.string().optional(),
  /** Path or URL of an asciinema cast (.cast) recorded from the project. */
  cast: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;
