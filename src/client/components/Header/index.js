import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage, defineMessages } from 'react-intl';

import SwitchLocale from '../SwitchLocale';

export const msg = defineMessages({
  title: {
    id: 'header.title',
    defaultMessage: 'React workshop'
  }
});

class Header extends React.Component {
  render() {
    return (
      <Navbar staticTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><FormattedMessage {...msg.title} /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/localization">
              <NavItem>
                Localization
              </NavItem>
            </LinkContainer>
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

export default withRouter(Header);
