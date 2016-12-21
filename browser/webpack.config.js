// Dev script

var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
var combineLoaders = require('webpack-combine-loaders')
var path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  //entry: './js/appEntry.js',
  entry: './js/loginEntry.js',
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
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    // path: 'build',
    filename: 'app.min.js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  plugins: debug ? [] :
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]

}
