import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown,ListGroup } from 'react-bootstrap';


export default function NavBar() {
  const isuserLoggedin = localStorage.getItem("token") !== ""
  const useremail = localStorage.getItem("email")
  const type = localStorage.getItem("usertype")
  const userid= localStorage.getItem("userid")

  const logout =()=> {
  
    localStorage.setItem("token","")
    localStorage.setItem("email","")
    localStorage.setItem("usertype","")
    localStorage.setItem("userid","")
    window.location.reload(false);
}

  return (
    <Navbar className="homebidder-nav" variant="dark" bg="dark" sticky="top" >
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
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        <Nav className="ms-auto">
       
          <Nav.Link as={Link} to="/">Listings</Nav.Link>
        
            <div>
              <ul> <li className="nav">

            <Nav.Link href="/login" >Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </li></ul>
            </div>
            {isuserLoggedin &&  (
             <div className="ms-auto">
             <p className="text-white bg-dark"> welcome{useremail}</p>
               </div> )}
        
               {(isuserLoggedin  && type == 2) && (
          <NavDropdown title="User" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">My Favourites</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/properties/new">Create New Listing</NavDropdown.Item>
            <NavDropdown.Divider />
            
            <NavDropdown.Item  onClick={logout} as={Link} to="logout">
              Logout
            </NavDropdown.Item> 
            
          </NavDropdown>
               )}
            {(isuserLoggedin  && type == 1) && (
          <NavDropdown title="Admin" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="getRoute">Pending Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  onClick={logout} as={Link} to="logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
            )}

           
          </Nav>
      
        </Navbar.Collapse>
      
    </Navbar>
  );
};