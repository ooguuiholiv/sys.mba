const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  resolve: {
    fallback: {
      events: require.resolve("team/"),
    },
  },
  plugins: [new NodePolyfillPlugin()],
};