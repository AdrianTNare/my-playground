import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["@playground/contracts", "@playground/content"],
  // Nothing lives at the root; the admin is the app.
  redirects: async () => [
    { source: "/", destination: "/admin", permanent: false },
  ],
  turbopack: { root: path.resolve(dirname, "../..") },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
