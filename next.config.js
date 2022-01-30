/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    removeConsole: false,
    outputStandalone: true,
    // reactRoot: true,
    // concurrentFeatures: true,
  },
};
