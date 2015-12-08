var path = require('path');
 
module.exports = {
  entry: './views/js/index.js',
  output: {
    path: path.join(__dirname, 'views', 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
      	test: /\.js$/,
        include: path.join(__dirname, 'views', 'js'),
        loader: 'babel-loader'
      }
    ]
  }
};