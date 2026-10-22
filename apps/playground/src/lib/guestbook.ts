import { z } from "zod";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://adriannare-api.netlify.app";

const EntrySchema = z.object({
  id: z.number(),
  name: z.string(),
  message: z.string(),
  createdAt: z.string(),
});
export type GuestbookEntry = z.infer<typeof EntrySchema>;

const ErrorSchema = z.object({ message: z.string() });

/** Latest entries, newest first. */
export const readGuestbook = async (): Promise<GuestbookEntry[]> => {
  const res = await fetch(`${API_URL}/guestbook`);
  if (!res.ok) throw new Error(`guestbook: ${res.status}`);
  return z.array(EntrySchema).parse(await res.json());
};

/** Signs it; throws with the API's own wording when it says no. */
export const signGuestbook = async (
  message: string,
): Promise<GuestbookEntry> => {
  const res = await fetch(`${API_URL}/guestbook`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const json: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const parsed = ErrorSchema.safeParse(json);
    throw new Error(
      parsed.success ? parsed.data.message : `guestbook: ${res.status}`,
    );
  }
  return EntrySchema.parse(json);
};
