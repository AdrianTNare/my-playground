import { OpenAPIHono } from "@hono/zod-openapi";

/** A router whose routes are documented in the OpenAPI spec. */
export const createRouter = () => new OpenAPIHono();
