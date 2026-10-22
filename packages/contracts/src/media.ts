import { z } from "zod";

export const MediaSourceSchema = z.enum([
  "youtube",
  "podcast",
  "article",
  "tweet",
]);
export type MediaSource = z.infer<typeof MediaSourceSchema>;

/** A short reaction to a video, podcast, article or post. */
export const MediaReactionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  date: z.iso.date(),
  source: MediaSourceSchema,
  sourceUrl: z.url(),
  /** Who made it, e.g. the channel or podcast. */
  by: z.string().min(1),
  /** Markdown. */
  body: z.string().min(1),
  takeaways: z.array(z.string().min(1)).default([]),
});
export type MediaReaction = z.infer<typeof MediaReactionSchema>;
