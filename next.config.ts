import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (tools.wearedh.com via CNAME in public/).
  output: "export",
  // GitHub Pages serves /utm/index.html for a /utm/ request, not /utm.html,
  // so route folders need a trailing slash to resolve without a redirect.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
