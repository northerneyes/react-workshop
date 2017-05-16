import React from 'react';
import { object } from 'prop-types';
import {
  FormattedMessage,
  defineMessages,
  FormattedDate,
  FormattedNumber
} from 'react-intl';
import { FormControl, Button } from 'react-bootstrap';

export const msg = defineMessages({
  welcome: {
    id: 'localization.welcome',
    defaultMessage: `Hello {name}, the date is {date}, you have {unreadCount, number} {unreadCount, plural,
      one {message}
      other {messages}
    } and a lot of money {money}`
  },
  inputText: {
    id: 'localization.inputText',
    defaultMessage: 'Enter your text here'
  },
  clickMe: {
    id: 'localization.clickMe',
    defaultMessage: 'Click me'
  }
});

class Localization extends React.Component {
  render() {
    const { intl } = this.context;
    const clickMeMessage = intl.formatMessage(msg.clickMe);
    return (
      <div>
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
                <FormattedNumber value={1000} style="currency" currency="EUR" />
              ),
              unreadCount: 25
            }}
          />
        </h3>
        <FormattedMessage {...msg.inputText}>
          {text => (
            <FormControl id="formControlsText" type="text" placeholder={text} />
          )}
        </FormattedMessage>
        <Button bsStyle="primary">{clickMeMessage}</Button>
      </div>
    );
  }
}

Localization.contextTypes = {
  intl: object
};

export default Localization;
