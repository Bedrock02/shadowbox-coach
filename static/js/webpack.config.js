const path = require('path');

module.exports = {
  entry: './index.js',
  cache: true,
  watch: true,
  output: {
    path: path.resolve('./build'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    modules: ['./js', './node_modules'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
