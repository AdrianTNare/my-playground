import { z } from "zod";

/** Which tinkering booth a tool shows up in. */
export const ToolSectionSchema = z.enum(["terminal", "toolset"]);
export type ToolSection = z.infer<typeof ToolSectionSchema>;

/** Something in the daily rotation, and why it earned its place. */
export const ToolSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  section: ToolSectionSchema,
  /** Grouping inside the booth, e.g. "editor" or "shell". */
  category: z.string().min(1),
  url: z.url().optional(),
  why: z.string().min(1),
  /** Optional markdown with config snippets or detail. */
  details: z.string().optional(),
  order: z.number().int().default(0),
});
export type Tool = z.infer<typeof ToolSchema>;
