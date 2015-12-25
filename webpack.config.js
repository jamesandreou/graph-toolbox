var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './views/js/gtheory.js',
  output: {
    path: path.join(__dirname, 'views', 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
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