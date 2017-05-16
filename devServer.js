const webpack = require('webpack');
const winston = require('winston');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');

const express = require('express');
const constants = require('./constants');

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  headers: { 'Access-Control-Allow-Origin': '*' },
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(compiler));

const port = constants.HOT_RELOAD_PORT;
app.listen(port, () => winston.info(`Hot server started at port ${port}`));

