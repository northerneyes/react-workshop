const webpack = require('webpack');

const constants = require('./constants');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicAssets = require('./assets');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  webpackIsomorphicAssets
);

const hmrPlugin = [
  'react-transform',
  {
    transforms: [
      {
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }
    ]
  }
];

module.exports = {
  entry: {
    app: [
      `webpack-hot-middleware/client?path=http://localhost:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
      './src/client/index.js'
    ]
  },

  output: {
    filename: 'app.js',
    // the output bundle

    path: constants.BUILD_DIR,

    publicPath: `http://localhost:${constants.HOT_RELOAD_PORT}/build/`
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

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
        use: ['style-loader', 'css-loader']
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
              ],
              plugins: [hmrPlugin]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // important: preventing HMR is being stopped after error occurs,
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    webpackIsomorphicToolsPlugin.development()
  ]
};
