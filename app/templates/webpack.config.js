module.exports = {
  entry: './app/entry.js',
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://0.0.0.0:6060/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.html/, loader: 'html-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.mp4$/, loader: 'file-loader'}
    ]
  },
  <% if (electron) { %>
  target: 'atom'
  <% } %>
}
