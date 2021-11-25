import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  ListGroup,
  Table,
} from "react-bootstrap";
import Login from "./Login";
import RegisterModal from "./Register";

export default function NavBar() {
  const isuserLoggedin = localStorage.getItem("token") !== "";
  const useremail = localStorage.getItem("email");
  const type = localStorage.getItem("usertype");
  const userid = localStorage.getItem("userid");

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    localStorage.setItem("usertype", "");
    localStorage.setItem("userid", "");
    window.location.reload(false);
  };
  const toggleRegisterModal = () => {
    setShowRegister(!showRegister);
  };

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };
  return (
    <Navbar className="homebidder-nav" variant="dark" bg="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">
        <img
          alt="homebidder-icon"
          src="/home.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        HomeBidder
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Listings
          </Nav.Link>

          <div>
            <ul>
              {" "}
              <li className="nav">
                {/* <Nav.Link href="/login" >Login</Nav.Link> */}
                <div>
                  <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleLoginModal}
                  >
                    
                    <Nav.Link className="text-white bg-dark">Login</Nav.Link>
                  </p>
                </div>
                <div>
                  <p>|</p>
                </div>
                <div>
                  <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleRegisterModal}
                  >
                    {" "}
                    <Nav.Link className="text-white bg-dark">Register</Nav.Link>
                  </p>
                </div>
                {/* <Nav.Link href="/register">Register</Nav.Link> */}
              </li>
            </ul>
          </div>
          {isuserLoggedin && (
            <div className="ms-auto">
              <p className="text-white bg-dark"> welcome{useremail}</p>
            </div>
          )}

          {isuserLoggedin && type == 2 && (
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="getRoute">
                My Favourites
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="getRoute">
                My Bids
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="getRoute">
                My Listings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/properties/new">
                Create New Listing
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={logout} as={Link} to="logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          {isuserLoggedin && type == 1 && (
            <NavDropdown title="Admin" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="getRoute">
                Pending Listings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="getRoute">
                My Bids
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} as={Link} to="logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <RegisterModal
          show={showRegister}
          toggleRegisterModal={toggleRegisterModal}
        ></RegisterModal>
        <Login show= {showLogin}
           toggleLoginModal={toggleLoginModal}>
        </Login>
      </Navbar.Collapse>
    </Navbar>
  );
}
