import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function NavBar() {

  return (
    <Navbar className="homebidder-nav" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
          alt="homebidder-icon"
          src="/home.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          />{' '}
          HomeBidder
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/">Listings</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <NavDropdown title="User" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">My Favourites</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="postRoute">Create New Listing</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="logout">
              Logout
          </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Admin" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">Pending Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};