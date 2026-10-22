import { createRoute, z } from "@hono/zod-openapi";
import { desc, eq } from "drizzle-orm";
import type { Db } from "../db/client";
import { guestbookEntries } from "../db/schema";
import { createRouter } from "../router";

const LINK = /https?:\/\/|www\.|\.[a-z]{2,}\//i;

const EntrySchema = z
  .object({
    id: z.number().int(),
    name: z.string(),
    message: z.string(),
    createdAt: z.string(),
  })
  .openapi("GuestbookEntry");

const SignSchema = z
  .object({
    name: z.string().trim().min(1).max(40).default("a visitor"),
    message: z
      .string()
      .trim()
      .min(1)
      .max(280)
      .refine((value) => !LINK.test(value), "Links aren't allowed"),
    /** Honeypot: hidden from people, filled in by bots. */
    website: z.string().max(0).optional(),
  })
  .openapi("GuestbookSign");

const ErrorSchema = z.object({ message: z.string() }).openapi("Error");

const list = createRoute({
  method: "get",
  path: "/guestbook",
  tags: ["guestbook"],
  summary: "Latest guestbook entries, newest first",
  responses: {
    200: {
      description: "Up to 50 entries",
      content: { "application/json": { schema: z.array(EntrySchema) } },
    },
  },
});

const sign = createRoute({
  method: "post",
  path: "/guestbook",
  tags: ["guestbook"],
  summary: "Sign the guestbook",
  request: {
    body: { content: { "application/json": { schema: SignSchema } } },
  },
  responses: {
    201: {
      description: "Signed",
      content: { "application/json": { schema: EntrySchema } },
    },
    400: {
      description: "Invalid entry",
      content: { "application/json": { schema: ErrorSchema } },
    },
  },
});

const columns = {
  id: guestbookEntries.id,
  name: guestbookEntries.name,
  message: guestbookEntries.message,
  createdAt: guestbookEntries.createdAt,
};

export const guestbook = (getDb: () => Db) =>
  createRouter()
    .openapi(list, async (ctx) => {
      const db = getDb();
      const entries = await db
        .select(columns)
        .from(guestbookEntries)
        .where(eq(guestbookEntries.hidden, false))
        .orderBy(desc(guestbookEntries.id))
        .limit(50);
      return ctx.json(entries, 200);
    })
    .openapi(sign, async (ctx) => {
      const { name, message } = ctx.req.valid("json");
      const db = getDb();
      const [entry] = await db
        .insert(guestbookEntries)
        .values({ name, message })
        .returning(columns);
      return ctx.json(entry, 201);
    });
