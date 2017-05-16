import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Grid, PageHeader } from 'react-bootstrap';

import Header from '../../components/Header';

export const msg = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'Building something interesting'
  }
});

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PageHeader>
          <Grid>
            <FormattedMessage {...msg.title} />
          </Grid>
        </PageHeader>
        <Grid>
          <h1>Some content</h1>
        </Grid>
      </div>
    );
  }
}
