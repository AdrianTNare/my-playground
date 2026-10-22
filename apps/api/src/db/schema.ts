import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Messages left with `echo "…" >> guestbook` on the home page shell. */
export const guestbookEntries = sqliteTable("guestbook_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))`),
  /** Lets a bad entry be hidden without deleting it. */
  hidden: integer("hidden", { mode: "boolean" }).notNull().default(false),
});
