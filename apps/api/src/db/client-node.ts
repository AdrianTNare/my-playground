import { drizzle } from "drizzle-orm/libsql/node";
import { env } from "../env";
import { createWebDb, type Db } from "./client";

/** Local dev and tests: the native driver for `file:` URLs, else Turso. */
export const createDb = (url = env.DATABASE_URL): Db =>
  url.startsWith("file:") ? drizzle({ connection: { url } }) : createWebDb(url);
