const path = require('path')
const webpack = require('webpack')

const config = {
  devtool: 'source-map',
  entry: './{{ cookiecutter.package_name }}/stati_srcc/js/app',
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2017']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
}

module.exports = config
