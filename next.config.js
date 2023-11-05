/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NOTION_ACCESS_TOKEN: "secret_zOT0yUzyeF1ja6JEu9E8mKNpRaLUNFf5vqONica2aOG",
    NOTION_BLOG_DATABASE_ID: "55b47492ad304ff6a6627c2ff3aaf7d3",
  },
};

module.exports = nextConfig;
