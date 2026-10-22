import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import packageJson from "../package.json" with { type: "json" };
import type { Db } from "./db/client";
import { env } from "./env";
import { createRouter } from "./router";
import { guestbook } from "./routes/guestbook";
import { health } from "./routes/health";

interface AppOptions {
  /** The database, opened on first use by whoever hosts the app. */
  getDb: () => Db;
}

/** The whole API, independent of where it runs (Node or Netlify). */
export const createApp = ({ getDb }: AppOptions) => {
  const app = createRouter();

  app.use("*", cors({ origin: env.CORS_ORIGIN }));
  if (env.NODE_ENV !== "test") app.use(logger());

  app.route("/", health);
  app.route("/", guestbook(getDb));

  app.doc("/doc", {
    openapi: "3.1.0",
    info: { version: packageJson.version, title: "playground API" },
  });
  app.get("/reference", apiReference({ url: "/doc", theme: "kepler" }));

  app.notFound((ctx) =>
    ctx.json({ message: `404 ${ctx.req.path} not found` }, 404),
  );

  return app;
};
