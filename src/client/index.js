require('intl');
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/ru.js');
require('whatwg-fetch');
require('babel-polyfill');

const { addLocaleData } = require('react-intl');
const en = require('react-intl/locale-data/en');
const ru = require('react-intl/locale-data/ru');

[en, ru].forEach(locale => addLocaleData(locale));

require('./main');
