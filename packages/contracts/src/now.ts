import { z } from "zod";

export const NowSectionSchema = z.object({
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

export const NowPageSchema = z.object({
  updated: z.iso.date(),
  location: z.string().min(1),
  sections: z.array(NowSectionSchema).min(1),
});
export type NowPage = z.infer<typeof NowPageSchema>;
