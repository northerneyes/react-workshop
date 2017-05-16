import React from 'react';

import express from 'express';
import winston from 'winston';
import ReactDOMServer from 'react-dom/server';

import App from '../client/pages/App';
import Html from './Html';

const app = express();
app.use('/assets', express.static('build', { maxAge: '200d' }));

function renderApp() {
  return ReactDOMServer.renderToString(
    <App />,
  );
}

async function render(req, res) {
  const html = renderApp(req);

  const markup = ReactDOMServer.renderToString(
    <Html
      html={html}
    />,
  );

  res.status(200).send(`<!DOCTYPE html>${markup}`);
}

app.get('*', render);

const port = 8000;
app.listen(port, () => winston.info(`server started at ${port}`));
