import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

// Repository name used for GitHub Pages base path
const REPO_NAME = 'smart-farmer-assistant-app';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Export static HTML for GitHub Pages
  output: 'export',
  // When deployed (NODE_ENV=production), serve from /<repo>
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  trailingSlash: true,
  images: {
    // Disable Next.js image optimization for static export on GitHub Pages
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
