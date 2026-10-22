import { handle } from "hono/netlify";
import { createApp } from "../../src/app";

// Netlify Functions entry: every path on the site is served by the app.
export default handle(createApp());

export const config = { path: "/*" };
