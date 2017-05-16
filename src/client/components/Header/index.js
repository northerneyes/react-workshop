import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

import { FormattedMessage, defineMessages } from 'react-intl';

export const msg = defineMessages({
  title: {
    id: 'title',
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
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
