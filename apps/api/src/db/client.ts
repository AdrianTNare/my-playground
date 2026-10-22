import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../env";

/** libsql via Drizzle: a local file in dev, Turso in production. */
export const db = drizzle({
  client: createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  }),
});
