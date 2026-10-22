import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@playground/contracts"],
};

export default nextConfig;
