import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import packageJson from "../package.json" with { type: "json" };
import { env } from "./env";
import { createRouter } from "./router";
import { health } from "./routes/health";

/** The whole API, independent of where it runs (Node or Netlify). */
export const createApp = () => {
  const app = createRouter();

  app.use("*", cors({ origin: env.CORS_ORIGIN }));
  if (env.NODE_ENV !== "test") app.use(logger());

  app.route("/", health);

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
