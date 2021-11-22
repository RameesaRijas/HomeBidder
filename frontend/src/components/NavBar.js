import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav ,NavDropdown} from 'react-bootstrap';
import Login from './Login';

export default function NavBar() {
  const isuserLoggedin = localStorage.getItem("token") !== ""
  const useremail = localStorage.getItem("email")
  const logout =()=> {
 
    localStorage.setItem("token","")
}
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
           {!isuserLoggedin && ( 
            <div>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </div>
          
           )}
           {isuserLoggedin && (
             <p> welcome{useremail}</p>
           )}
        </Nav>
        <Nav>
          <NavDropdown>
               <NavDropdown.Item onClick={logout} >logout</NavDropdown.Item>
               </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};