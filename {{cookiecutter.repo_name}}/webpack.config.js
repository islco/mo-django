const path = require('path')
const webpack = require('webpack')

const config = {
  devtool: 'source-map',
  entry: './{{ cookiecutter.package_name }}/static_src/js/app',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    ]
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
}

module.exports = config
