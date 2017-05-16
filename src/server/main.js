import React from 'react';
import express from 'express';
import winston from 'winston';
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import loadMessages from './intl/loadMessages';
import App from '../client/pages/App';
import Html from './Html';
import rootSaga from '../common/sagas';

import FetchProvider from '../client/FetchProvider';

import createStore from '../common/store';

const messages = loadMessages();

const app = express();
app.use('/assets', express.static('build', { maxAge: '200d' }));

function renderApp(store, { defaultLocale, currentLocale }, req, fetches) {
  return ReactDOMServer.renderToString(
    <IntlProvider
      defaultLocale={defaultLocale}
      key={currentLocale} // https://github.com/yahoo/react-intl/issues/234
      locale={currentLocale}
      messages={messages}>
      <FetchProvider fetches={fetches}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      </FetchProvider>
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

  // First render to collect all fetches
  const saga = store.runSaga(rootSaga);
  const fetches = [];
  renderApp(store, initialState.intl, req, fetches);

  const promises = [...fetches.map(fetch => fetch(store)), saga.done];
  store.close();
  await Promise.all(promises);

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
