import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavBar() {

  return (
    <Navbar className="homebidder-nav" variant="dark">
      <Container className="row justify-content-between">
        <Navbar.Brand href="#home">HomeBidder</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Listings</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}