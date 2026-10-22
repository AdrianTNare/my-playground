import { z } from "zod";

/** A post on the external blog, shown as a preview in the Blog booth. */
export const BlogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  brief: z.string().min(1),
  url: z.url(),
  /** ISO date, e.g. "2025-02-27". */
  date: z.iso.date(),
  /** Cover image URL; absent when the post has none. */
  coverImage: z.url().optional(),
  /** Estimated from the post's word count; the feed has no read time. */
  readTimeMinutes: z.number().int().positive(),
  tags: z.array(z.string().min(1)).default([]),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;
