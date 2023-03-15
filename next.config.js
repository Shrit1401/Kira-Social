/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // add unplash
  images: {
    domains: ["images.unsplash.com", "i.postimg.cc"],
  },
};

module.exports = nextConfig;
