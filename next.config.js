/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "media.licdn.com",
      "m.media-amazon.com",
    ],
  },
};

module.exports = nextConfig;
