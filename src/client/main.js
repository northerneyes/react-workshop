/* global window, document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from '../common/store';
import App from './pages/App';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
const store = createStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
  () => {
    delete window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
  }
);
