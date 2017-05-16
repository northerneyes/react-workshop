/* eslint-disable react/no-danger */

import React from 'react';
import { string, object } from 'prop-types';

function Html(props) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(props.state)}` }} />
        <script src={`${props.mainScripts.app}`} />
      </body>
    </html>
  );
}

Html.propTypes = {
  html: string.isRequired,
  state: object.isRequired,
  mainScripts: object.isRequired
};

export default Html;
