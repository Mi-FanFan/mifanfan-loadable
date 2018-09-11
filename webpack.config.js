const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin  = require('html-webpack-plugin')

module.exports = {
  entry: ['react-dev-utils/webpackHotDevClient', path.resolve(__dirname, './examples/index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: './index.html'})
  ]
}



