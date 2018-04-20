import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";
import "../App.css";
import { Link } from 'react-router-dom'
class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">TopMedia</NavbarBrand>
        <Nav>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Fleet
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem ><Link to="/fleetmap">Fleet Map</Link></DropdownItem>
              <DropdownItem ><Link to="/fleetarea">Fleet Area</Link></DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink href="#" active>
              content
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">maintenance</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">reports</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MyNavbar;
