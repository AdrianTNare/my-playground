import { z } from "zod";

/** One item in a booth's list (a TIL, a reaction, a ref...). */
export const EntrySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  /** ISO date, e.g. "2026-10-22". */
  date: z.iso.date(),
  /** Marks the placeholder shown while a booth has no real content. */
  comingSoon: z.boolean().default(false),
});
export type Entry = z.infer<typeof EntrySchema>;
