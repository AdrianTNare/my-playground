import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Bliki, Reflections, Tils } from "./collections/posts";
import { MediaReactions } from "./collections/MediaReactions";
import { Projects } from "./collections/Projects";
import { Refs } from "./collections/Refs";
import { Tools } from "./collections/Tools";
import { Users } from "./collections/Users";
import { Now } from "./globals/Now";
import { editorFeatures } from "./fields/lexicalBody";
import { UnofficeHours } from "./globals/UnofficeHours";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const secret = process.env.PAYLOAD_SECRET;
if (!secret) throw new Error("PAYLOAD_SECRET is not set (see .env.example)");

// The playground reads the REST API server-side; listing it here also lets a
// browser on the playground origin call it if that's ever needed.
const playgroundUrl = process.env.PLAYGROUND_URL;

export default buildConfig({
  serverURL: process.env.CMS_URL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " — playground cms" },
  },
  collections: [
    Tils,
    Reflections,
    Bliki,
    MediaReactions,
    Refs,
    Projects,
    Tools,
    Users,
  ],
  globals: [Now, UnofficeHours],
  editor: lexicalEditor({ features: editorFeatures }),
  secret,
  cors: playgroundUrl ? [playgroundUrl] : [],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  // A local file in dev; Turso (libsql://…) in production.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./cms.db",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    migrationDir: path.resolve(dirname, "migrations"),
    // Schema changes only ever come from migrations. Dev-mode push marks the
    // database as "dev", and `payload migrate` then refuses to run on deploy.
    push: false,
  }),
  graphQL: { disable: true },
  telemetry: false,
});
