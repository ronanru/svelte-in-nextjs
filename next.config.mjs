import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          svelte: path.resolve("node_modules", "svelte/src/runtime"), // Svelte 3: path.resolve('node_modules', 'svelte')
        },
        extensions: [...config.resolve.extensions, ".svelte"],
        mainFields: [
          ...config.resolve.mainFields,
          "svelte",
          "browser",
          "module",
          "main",
        ],
        conditionNames: ["svelte", "browser", "import"],
      },
      module: {
        rules: [
          ...config.module.rules,
          {
            test: /\.(html|svelte)$/,
            use: "svelte-loader",
          },
          {
            // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    };
  },
};

export default nextConfig;
