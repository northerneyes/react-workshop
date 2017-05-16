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
        <script src={`${props.mainScripts.app}`} />
      </body>
    </html>
  );
}

Html.propTypes = {
  html: string.isRequired,
  mainScripts: object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Html;
