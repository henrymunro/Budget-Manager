var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var combineLoaders = require('webpack-combine-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: {
    './js/client.js',
  entry:  {
    app : __dirname + "/js/client.js",
    login : __dirname + "/js/login.js"
  }
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },

      { test: /\.(png|JPG)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest

      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }
    ]
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  plugins: debug ? [new ExtractTextPlugin('styles.css')] :
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]

}
