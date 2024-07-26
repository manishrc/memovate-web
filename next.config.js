/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

module.exports = {
  // Enable for Cloudflare Workers
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
  //     })
  //   );
  //   return config;
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.BACKEND_URL}/:path*`,
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: '/:login(login|signup|forgot-password|$)',
        has: [
          {
            type: 'cookie',
            key: 'authjs.session-token',
          },
        ],
        permanent: false,
        destination: process.env.NEXT_PUBLIC_AUTH_DEFAULT_LOGGED_IN_URL,
      },
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'authjs.session-token',
          },
        ],
        permanent: false,
        destination: process.env.NEXT_PUBLIC_AUTH_DEFAULT_LOGGED_IN_URL,
      },
      {
        source: '/app',
        missing: [
          {
            type: 'cookie',
            key: 'authjs.session-token',
          },
        ],
        permanent: false,
        destination: '/login',
      },
    ];
  },
};

// module.exports = withPWA(module.exports);

module.exports =
  process.env.NODE_ENV === 'development'
    ? withBundleAnalyzer(module.exports)
    : module.exports;

// Injected content via Sentry wizard below

module.exports =
  process.env.NODE_ENV === 'development'
    ? module.exports
    : withSentryConfig(module.exports, {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        org: 'manishrc',
        project: 'memovate-web',

        // Only print logs for uploading source maps in CI
        silent: !process.env.CI,

        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
        // This can increase your server load as well as your hosting bill.
        // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
        // side errors will fail.
        // tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
      });
