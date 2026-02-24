/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/tracker/:path*',
        destination: 'https://api.tracker.yandex.net/:path*',
      },
    ];
  },
  transpilePackages: ['@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-tooltip', 'rc-notification'],

  turbopack: {
    resolveAlias: {
      app: './src/_app',
      components: './src/components',
      entities: './src/entities',
      features: './src/features',
      pages: './src/pages',
      shared: './src/shared',
      config: './src/config',
      lib: './src/lib',
      styles: './src/styles',
      ui: './src/ui',
    },
  },
};
