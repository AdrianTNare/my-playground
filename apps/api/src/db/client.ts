import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/libsql/web";
import { env } from "../env";

export type Db = LibSQLDatabase;

/**
 * Turso over fetch: no native module, so the Netlify function bundles cleanly.
 * Local `file:` databases go through client-node.ts instead.
 */
export const createWebDb = (
  url = env.DATABASE_URL,
  authToken = env.DATABASE_AUTH_TOKEN,
): Db => drizzle({ connection: { url, authToken } });
