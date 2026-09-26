import type { NextConfig } from "next";

// On GitHub Pages the site lives at /vesper, so the static export needs a basePath.
// Locally (next dev) it stays at the root.
const onPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: onPages ? "/vesper" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
