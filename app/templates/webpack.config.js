module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.html/, loader: 'html-loader'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};
