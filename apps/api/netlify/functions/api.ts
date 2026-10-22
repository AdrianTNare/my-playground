import { handle } from "hono/netlify";
import { createApp } from "../../src/app";
import { createWebDb, type Db } from "../../src/db/client";

// Opened on the first request that needs it, reused while the function is warm.
let db: Db | undefined;

// Netlify Functions entry: every path on the site is served by the app.
export default handle(createApp({ getDb: () => (db ??= createWebDb()) }));

export const config = { path: "/*" };
