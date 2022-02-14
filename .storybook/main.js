module.exports = {
  stories: [
    "../projects/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  framework: "@storybook/angular",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {

    config.optimization = {
      ...config.optimization,
      minimize: false,
    };

    return config;
  },
}
