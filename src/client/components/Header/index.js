import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { FormattedMessage, defineMessages } from 'react-intl';

import SwitchLocale from '../SwitchLocale';

export const msg = defineMessages({
  title: {
    id: 'header.title',
    defaultMessage: 'React workshop'
  }
});

export default class Header extends React.Component {
  render() {
    return (
      <Navbar staticTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              <FormattedMessage {...msg.title} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Localization</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
          </Nav>
          <Nav pullRight>
            <SwitchLocale />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
