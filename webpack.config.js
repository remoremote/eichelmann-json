const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './netlify/functions/start-scraper.js',
  output: {
    path: path.resolve(__dirname, 'netlify/functions/dist'),
    filename: 'start-scraper-bundled.js',
    clean: true,
  },
  resolve: {
    fallback: { "path": false, "fs": false },
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