/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      //   "/": { page: "/" },
    };
  },
  // When error like this: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
  //
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { 
  //     fs: false, 
  //     path: false,
  //     process: false,
  //     util: false,
  //     events: false,
  //     assert: false,
  //     buffer: false,

  //    };

  //   return config;
  // },
};

module.exports = nextConfig;
