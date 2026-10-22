/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'adriannare.netlify.app' },
    ],
  },
}

export default nextConfig
