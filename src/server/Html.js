/* eslint-disable react/no-danger */

import React from 'react';
import { string } from 'prop-types';

function Html(props) {
  return (
    <html lang="en">
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.html }} />
        <script src="/assets/app.js" />
      </body>
    </html>
  );
}

Html.propTypes = {
  html: string.isRequired
};

export default Html;
