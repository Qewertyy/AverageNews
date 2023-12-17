/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.in",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.org",
        port: "",
      },
      {
        protocol: "http",
        hostname: "**.net",
        port: "",
      }
    ],
  },
};

module.exports = nextConfig;
