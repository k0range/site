import type { NextConfig } from "next";

import { withContentCollections } from "@content-collections/next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  
  headers: async () => {
    return [
      {
        source: '/.well-known/:slug*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  }
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    // Relative path(s) to source files
    srcPath: './src',
 
    extract: {
      // Defines which locale to extract to
      sourceLocale: 'ja'
    },
 
    messages: {
      // Relative path to the directory
      path: './messages',
 
      // Either 'json', 'po', or a custom format (see below)
      format: 'json',
 
      // Either 'infer' to automatically detect locales based on
      // matching files in `path` or an explicit array of locales
      locales: ['ja', 'en'],
    }
  }
});

// @ts-ignore
export default withContentCollections(withNextIntl(nextConfig));
