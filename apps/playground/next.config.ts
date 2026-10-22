import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@playground/contracts"],
  // Sidebar groups are directories with no page of their own.
  redirects: async () => [
    { source: "/reads", destination: "/reads/refs", permanent: false },
    { source: "/writing", destination: "/writing/til", permanent: false },
    { source: "/tinkering", destination: "/tinkering/terminal", permanent: false },
  ],
};

export default nextConfig;
