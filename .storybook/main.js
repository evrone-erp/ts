const path = require('path');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-mdx-gfm"
  ],

  "framework": {
    name: "@storybook/nextjs",
    options: {}
  },

  staticDirs: ['../public'],

  docs: {
    autodocs: true
  },

  async webpackFinal(config, { configType }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/components'),
      entities: path.resolve(__dirname, './src/entities'),
      features: path.resolve(__dirname, './src/features'),
      pages: path.resolve(__dirname, './src/pages'),
      shared: path.resolve(__dirname, './src/shared'),
      config: path.resolve(__dirname, './src/config'),
      lib: path.resolve(__dirname, './src/lib'),
      styles: path.resolve(__dirname, './src/styles'),
      ui: path.resolve(__dirname, './src/ui'),
    };

    return config;
  },
}
