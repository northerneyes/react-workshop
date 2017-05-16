import React from 'react';
import { object } from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import {
  FormattedMessage,
  defineMessages
} from 'react-intl';
import { Grid, PageHeader } from 'react-bootstrap';

import start from '../../start';
import Header from '../../components/Header';
import Localization from '../Localization';
import News from '../News';

export const msg = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Building something interesting'
  }
});

class App extends React.Component {
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
          <Route exact path="/localization" component={Localization} />
          <Route exact path="/news" component={News} />
        </Grid>
      </div>
    );
  }
}

App.contextTypes = {
  intl: object
};

export default withRouter(start(App));
