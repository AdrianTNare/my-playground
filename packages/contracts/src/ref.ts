import { z } from "zod";

/** A reference worth bookmarking, with a note on why. */
export const RefSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  url: z.url(),
  /** Markdown, a sentence or two. */
  note: z.string().min(1),
  date: z.iso.date(),
  tags: z.array(z.string().min(1)).default([]),
});
export type Ref = z.infer<typeof RefSchema>;
