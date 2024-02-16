require("dotenv").config();

const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const nodeExternals = require("webpack-node-externals");
const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: {
    server: "./src/server.ts",
  },
  mode: NODE_ENV,
  // watch: NODE_ENV === "development",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
};
