import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { object } from 'prop-types';

export default function start(Wrapped) {
  class Start extends React.Component {
    render() {
      const { intl } = this.props;
      const { currentLocale } = intl;

      return (
        <IntlProvider
          defaultLocale={intl.defaultLocale}
          key={currentLocale} // https://github.com/yahoo/react-intl/issues/234
          locale={currentLocale}
          messages={intl.messages[currentLocale]}>
          <Wrapped {...this.props} />
        </IntlProvider>
      );
    }
  }

  Start.propTypes = {
    intl: object.isRequired
  };

  return connect(state => ({
    intl: state.intl
  }))(Start);
}
