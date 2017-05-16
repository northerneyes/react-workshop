import React from 'react';

import express from 'express';
import winston from 'winston';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider } from 'react-intl';

import loadMessages from './intl/loadMessages';
import App from '../client/pages/App';
import Html from './Html';

const messages = loadMessages();

const app = express();
app.use('/assets', express.static('build', { maxAge: '200d' }));

function renderApp() {
  return ReactDOMServer.renderToString(
    <IntlProvider locale="en">
      <App />
    </IntlProvider>,
  );
}

async function render(req, res) {
  const html = renderApp(req);

  const {
    javascript: mainScripts
  } = global.webpackIsomorphicTools.assets();

  if (process.NODE_ENV !== 'production') {
    global.webpackIsomorphicTools.refresh();
  }

  const markup = ReactDOMServer.renderToString(
    <Html
      html={html}
      mainScripts={mainScripts}
    />,
  );

  res.status(200).send(`<!DOCTYPE html>${markup}`);
}

app.get('*', render);

const port = 8000;
app.listen(port, () => winston.info(`server started at ${port}`));
