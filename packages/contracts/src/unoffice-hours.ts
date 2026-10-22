import { z } from "zod";

export const UnofficeHoursSchema = z.object({
  /** Booking link (cal.com or similar); null until it exists. */
  bookingUrl: z.url().nullable(),
  durationMinutes: z.number().int().positive(),
  timezone: z.string().min(1),
  intro: z.array(z.string().min(1)).min(1),
  goodFor: z.array(z.string().min(1)).min(1),
  notFor: z.array(z.string().min(1)).min(1),
});
export type UnofficeHours = z.infer<typeof UnofficeHoursSchema>;
