import React from 'react';
// import { Link } from 'react-router-dom';

import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

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
          <NavDropdown title="User" id="navbarScrollingDropdown">
            <NavDropdown.Item href="getRoute">My Favourites</NavDropdown.Item>
            <NavDropdown.Item href="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Item href="getRoute">My Listings</NavDropdown.Item>
            <NavDropdown.Item href="postRoute">Create New Listing</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="logout">
              Logout
          </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Admin" id="navbarScrollingDropdown">
            <NavDropdown.Item href="getRoute">Pending Listings</NavDropdown.Item>
            <NavDropdown.Item href="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};