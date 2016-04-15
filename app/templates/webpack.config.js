'use strict'
let webpack = require('webpack')
let path = require('path')

module.exports = {
  entry: './app/entry.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.html/, loader: 'html-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.mp4$/, loader: 'file-loader'},
      {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel', query: {presets: ['es2015']}},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  <% if (electron) { %>
  plugins: [ new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }) ],
  target: 'electron'
  <% } %>
}
