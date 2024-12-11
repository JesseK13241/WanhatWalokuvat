/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.finna.fi",
      },
      {
        protocol: "https",
        hostname: "api.finna.fi",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
      },
    ],
  },
}

export default nextConfig
