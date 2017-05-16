require('babel-register')({
  presets: [
    'react',
    ['env', { targets: { node: true } }],
  ],
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicAssets = require('../../assets');
const rootDir = require('path').resolve(__dirname, '../..');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets).server(rootDir, () => {
  require('./main');
});

