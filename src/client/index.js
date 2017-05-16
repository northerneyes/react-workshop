/* global window, document */

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import App from './pages/App';

ReactDOM.render(
  <IntlProvider locale="en">
    <App />
  </IntlProvider>,
  document.getElementById('app')
);
