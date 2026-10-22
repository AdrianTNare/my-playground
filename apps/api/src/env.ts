import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3040),
  /** Origins allowed to call the API from a browser, comma-separated. */
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:3000")
    .transform((value) => value.split(",").map((origin) => origin.trim())),
  /** libsql URL: a local file in dev, Turso in production. */
  DATABASE_URL: z.string().default("file:./api.db"),
  DATABASE_AUTH_TOKEN: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

/** Parsed once at startup, so a bad variable fails loudly and early. */
export const env: Env = EnvSchema.parse(process.env);
