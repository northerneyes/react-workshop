import React from 'react';
import { object } from 'prop-types';

import {
  FormattedMessage,
  defineMessages,
  FormattedDate,
  FormattedNumber
} from 'react-intl';
import { Grid, PageHeader, FormControl, Button } from 'react-bootstrap';

import start from '../../start';
import Header from '../../components/Header';

export const msg = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Building something interesting'
  },
  welcome: {
    id: 'app.welcome',
    defaultMessage: `Hello {name}, the date is {date}, you have {unreadCount, number} {unreadCount, plural,
      one {message}
      other {messages}
    } and a lot of money {money}`
  },
  inputText: {
    id: 'app.inputText',
    defaultMessage: 'Enter your text here'
  },
  clickMe: {
    id: 'app.clickMe',
    defaultMessage: 'Click me'
  }
});

class App extends React.Component {
  render() {
    const { intl } = this.context;
    const clickMeMessage = intl.formatMessage(msg.clickMe);

    return (
      <div>
        <Header />
        <PageHeader>
          <Grid>
            <FormattedMessage {...msg.title} />
          </Grid>
        </PageHeader>
        <Grid>
          <h3>
            <FormattedMessage
              {...msg.welcome}
              values={{
                date: (
                  <FormattedDate
                    value={Date.now()}
                    day="numeric"
                    month="long"
                    year="numeric"
                  />
                ),
                name: <b>George</b>,
                money: (
                  <FormattedNumber
                    value={1000}
                    style="currency"
                    currency="EUR"
                  />
                ),
                unreadCount: 25
              }}
            />
          </h3>
          <FormattedMessage {...msg.inputText}>
            {text => (
              <FormControl
                id="formControlsText"
                type="text"
                placeholder={text}
              />
            )}
          </FormattedMessage>
          <Button bsStyle="primary">{clickMeMessage}</Button>
        </Grid>
      </div>
    );
  }
}

App.contextTypes = {
  intl: object
};

export default start(App);
