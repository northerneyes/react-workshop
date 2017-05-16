const path = require('path');

const ABSOLUTE_BASE = path.normalize(__dirname);

const constants = Object.freeze({
  BUILD_DIR: path.join(ABSOLUTE_BASE, 'build'),
  HOT_RELOAD_PORT: 8080
});

module.exports = constants;
