import React from 'react';

import express from 'express';
import winston from 'winston';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import loadMessages from './intl/loadMessages';
import App from '../client/pages/App';
import Html from './Html';

import createStore from '../common/store';

const messages = loadMessages();

const app = express();
app.use('/assets', express.static('build', { maxAge: '200d' }));

function renderApp(store, { defaultLocale, currentLocale }) {
  return ReactDOMServer.renderToString(
    <IntlProvider
      defaultLocale={defaultLocale}
      key={currentLocale} // https://github.com/yahoo/react-intl/issues/234
      locale={currentLocale}
      messages={messages}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  );
}

function getInitialState(req) {
  const config = {
    locales: ['en', 'ru'],
    defaultLocale: 'en'
  };

  const currentLocale =
    req.acceptsLanguages(config.locales) || config.defaultLocale;

  return {
    intl: {
      currentLocale,
      defaultLocale: config.defaultLocale,
      initialNow: Date.now(),
      locales: config.locales,
      messages
    }
  };
}

async function render(req, res) {
  const initialState = getInitialState(req);
  const store = createStore(initialState);

  const html = renderApp(store, initialState.intl, req);

  const { javascript: mainScripts } = global.webpackIsomorphicTools.assets();

  if (process.NODE_ENV !== 'production') {
    global.webpackIsomorphicTools.refresh();
  }

  const markup = ReactDOMServer.renderToString(
    <Html html={html} mainScripts={mainScripts} state={store.getState()} />
  );

  res.status(200).send(`<!DOCTYPE html>${markup}`);
}

app.get('*', render);

const port = 8000;
app.listen(port, () => winston.info(`server started at ${port}`));
