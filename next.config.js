/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.gamemonetize.com", "gamemonetize.com"],
    formats: ["image/webp", "image/avif"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/ads.txt",
      },
    ];
  },
};

module.exports = nextConfig;
