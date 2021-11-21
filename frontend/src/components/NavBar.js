import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBar() {

  return (
    <Navbar className="homebidder-nav" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
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
          <Nav.Link href="/">Listings</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};