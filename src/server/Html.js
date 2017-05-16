/* eslint-disable react/no-danger */

import React from 'react';
import { string, object } from 'prop-types';

function Html(props) {
  return (
    <html lang="en">
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
