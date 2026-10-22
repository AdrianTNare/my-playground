import { z } from "zod";

/** Which writing booth a post lives in. */
export const PostKindSchema = z.enum(["til", "reflection", "bliki"]);
export type PostKind = z.infer<typeof PostKindSchema>;

/** A TIL, reflection or bliki entry. The body is markdown either way. */
export const PostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  /** ISO date, e.g. "2026-10-22". */
  date: z.iso.date(),
  /** Bliki entries get revised; this is the last revision. */
  updated: z.iso.date().optional(),
  tags: z.array(z.string().min(1)).default([]),
  body: z.string().min(1),
});
export type Post = z.infer<typeof PostSchema>;
