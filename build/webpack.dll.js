/*
 * @Author: hejin
 */ 
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    polyfill: ['babel-polyfill'],
    vendor: ['vue', 'vue-router', 'vuex']
  },
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[chunkhash]',
      path: path.join(__dirname, '../lib', '[name]-manifest.json'),
    }),
  ],
};
