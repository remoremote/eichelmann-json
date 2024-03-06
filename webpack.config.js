const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './netlify/functions/start-scraper.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // The corrected output directory
    filename: '[name].bundle.js',
  }, // Added missing comma here
  resolve: {
    fallback: { "path": false, "fs": false },
    alias: {
      '@root': path.resolve(__dirname),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};