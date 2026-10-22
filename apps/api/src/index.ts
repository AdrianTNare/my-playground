import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { createDb } from "./db/client-node";
import { env } from "./env";

const db = createDb();

serve(
  { fetch: createApp({ getDb: () => db }).fetch, port: env.PORT },
  ({ port }) => {
    console.log(
      `playground API on http://localhost:${port} (docs: /reference)`,
    );
  },
);
