/** @type {import('next').NextConfig} */

// GitHub Pages serves the site from /<repo-name>/, so the workflow passes the
// base path in. Locally it stays empty and the site runs from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
