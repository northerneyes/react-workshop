/* global window, document */

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import App from './pages/App';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

console.log('initialState', initialState);

ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('app'),
  () => {
    delete window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
  }
);
