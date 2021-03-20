const mainConfig = require('./webpack.main.config');
const rendererConfig = require('./webpack.renderer.config');
const authConfig = require('./webpack.auth.config');

const config = [mainConfig, rendererConfig, authConfig];

module.exports = config;
