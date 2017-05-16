import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import { setCurrentLocale } from '../../../common/intl/intl.actions';

class SwitchLocale extends React.Component {
  handleSelect(locale) {
    this.props.setCurrentLocale(locale);
  }

  render() {
    const { currentLocale, locales } = this.props;

    return (
      <NavDropdown
        onSelect={this.handleSelect}
        title={currentLocale}
        id="basic-nav-dropdown">
        {locales.map(locale => (
          <MenuItem
            active={currentLocale === locale}
            key={locale}
            eventKey={locale}>
            {locale}
          </MenuItem>
        ))}
      </NavDropdown>
    );
  }
}

SwitchLocale.propTypes = {
  currentLocale: propTypes.string.isRequired,
  locales: propTypes.array.isRequired,
  setCurrentLocale: propTypes.func.isRequired
};

export default connect(
  state => ({
    currentLocale: state.intl.currentLocale,
    locales: state.intl.locales
  }),
  { setCurrentLocale }
)(autobind(SwitchLocale));
