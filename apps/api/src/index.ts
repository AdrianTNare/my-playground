import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { env } from "./env";

serve({ fetch: createApp().fetch, port: env.PORT }, ({ port }) => {
  console.log(`playground API on http://localhost:${port} (docs: /reference)`);
});
