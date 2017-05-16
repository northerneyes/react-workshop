const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicAssets = require('./assets');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

module.exports = {
  entry: {
    app: './src/client/index.js'
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        loader: 'url-loader',
        test: /\.(gif|jpg|png|svg)($|\?)/,
        options: {
          limit: 10000
        }
      },
      {
        loader: 'url-loader',
        test: /favicon\.ico$/,
        options: {
          limit: 1
        }
      },
      {
        loader: 'url-loader',
        test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
        options: {
          limit: 100000
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                [
                  'env',
                  {
                    targets: { browsers: ['last 2 versions'] },
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        IS_BROWSER: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false // Because uglify reports irrelevant warnings.
      }
    }),
    webpackIsomorphicToolsPlugin,
    new ProgressBarPlugin()
  ]
};
