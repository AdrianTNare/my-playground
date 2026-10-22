import { OpenAPIHono } from "@hono/zod-openapi";

/**
 * A router whose routes are documented in the OpenAPI spec. Requests that
 * fail validation answer 400 with the first problem, in plain words.
 */
export const createRouter = () =>
  new OpenAPIHono({
    defaultHook: (result, ctx) => {
      if (!result.success) {
        const issue = result.error.issues[0];
        const field = issue?.path.join(".");
        return ctx.json(
          { message: field ? `${field}: ${issue.message}` : "Invalid request" },
          400,
        );
      }
    },
  });
