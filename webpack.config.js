const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: "node",
  mode: "production",
  entry: "./netlify/functions/start-scraper.js",
  output: {
    path: path.resolve(__dirname, "dist"), // The corrected output directory
    filename: "[name].bundle.js",
  },
  resolve: {
    fallback: { path: false, fs: false },
    alias: {
      "@root": path.resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Adjust if your index.html is located elsewhere
      filename: 'index.html'
    }),
    // Uncomment and adjust paths if you need to copy additional assets
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'path/to/assets', to: 'dist/assets' }
    //   ]
    // })
  ]
};
