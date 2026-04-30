/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8086", pathname: "/uploads/**" },
      { protocol: "https", hostname: "pbs.twimg.com" }
    ]
  }
};

module.exports = nextConfig;