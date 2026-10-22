import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@playground/contracts", "@playground/content"],
  images: {
    // Blog cover images from the Hashnode feed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        pathname: "/res/hashnode/image/**",
      },
    ],
  },
  // Sidebar groups are directories with no page of their own.
  redirects: async () => [
    { source: "/reads", destination: "/reads/refs", permanent: false },
    { source: "/writing", destination: "/writing/til", permanent: false },
    {
      source: "/tinkering",
      destination: "/tinkering/terminal",
      permanent: false,
    },
  ],
};

export default nextConfig;
