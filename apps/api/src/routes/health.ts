import { createRoute, z } from "@hono/zod-openapi";
import { createRouter } from "../router";

const HealthSchema = z
  .object({
    status: z.literal("ok"),
    uptimeSeconds: z.number().int().nonnegative(),
  })
  .openapi("Health");

const route = createRoute({
  method: "get",
  path: "/health",
  tags: ["meta"],
  summary: "Liveness check",
  responses: {
    200: {
      description: "The API is up",
      content: { "application/json": { schema: HealthSchema } },
    },
  },
});

export const health = createRouter().openapi(route, (ctx) =>
  ctx.json(
    { status: "ok" as const, uptimeSeconds: Math.floor(process.uptime()) },
    200,
  ),
);
