/** @type {import('next').NextConfig} */
let nextConfig = {
  // Enable for Cloudflare Workers
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
  //     })
  //   );
  //   return config;
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/:login(login|signup|forgot-password|$)',
        has: [
          {
            type: 'cookie',
            key: '__Secure-authjs.session-token',
          },
        ],
        permanent: false,
        destination: '/dashboard',
      },
    ];
  },
};

// module.exports = nextConfig;

// Bundle Size
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
nextConfig =
  process.env.NODE_ENV === 'development'
    ? withBundleAnalyzer(nextConfig)
    : nextConfig;

// Injected content via Sentry wizard below

module.exports =
  process.env.NODE_ENV === 'development'
    ? nextConfig
    : require('@sentry/nextjs').withSentryConfig(
        nextConfig,
        {
          // For all available options, see:
          // https://github.com/getsentry/sentry-webpack-plugin#options

          // Suppresses source map uploading logs during build
          silent: true,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        },
        {
          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,

          // Transpiles SDK to be compatible with IE11 (increases bundle size)
          transpileClientSDK: true,

          // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
          // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
          // side errors will fail.
          tunnelRoute: '/monitoring',

          // Hides source maps from generated client bundles
          hideSourceMaps: true,

          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,

          // Enables automowatic instrumentation of Vercel Cron Monitors.
          // See the following for more information:
          // https://docs.sentry.io/product/crons/
          // https://vercel.com/docs/cron-jobs
          automaticVercelMonitors: true,
        }
      );
