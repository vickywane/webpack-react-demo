const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base.config');
const buildPath = path.resolve(__dirname, './dist');

const UJS = require('uglifyjs-webpack-plugin');

const renderer = merge(base, {
  entry: {
    mainRenderer: './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|mp3|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      cache: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeTagWhitespace: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new UJS(),
  ],
  target: 'electron-renderer',
});

module.exports = renderer;
