import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar, Nav, NavDropdown, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { propertyContext } from '../providers/PropertyProvider';
import Login from './Login';
import Register from './Register';

export default function NavBar() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const toggleRegisterModal = () => {
    setShowRegister(!showRegister);
  };

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const {setLoggedInUser, state} = useContext(propertyContext);
  const hasRead = state.hasRead;
  const user = state.loggedUser;
  ///can be removed
  // const isuserLoggedin = localStorage.getItem("token") !== ""
  // const useremail = localStorage.getItem("email")
  // const type = localStorage.getItem("usertype")
  // const userid= localStorage.getItem("userid")

  const logout =()=> {
    setLoggedInUser("");
    ///can be removed
    // localStorage.setItem("token","")
    // localStorage.setItem("email","")
    // localStorage.setItem("usertype","")
    // localStorage.setItem("userid","")
    // window.location.reload(false);
  }

  const messages = hasRead && hasRead.length;
  console.log('message legnth ==> ', hasRead)

  return (
    <Navbar className="homebidder-nav" variant="dark" bg="dark" sticky="top" collapseOnSelect expand="lg">
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
          {!Object.keys(user).length && (
            <>
            <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleLoginModal}
                  >

                    <Nav.Link className="text-white bg-dark">Login</Nav.Link>
                  </p>
                  <p
                    clasName="p-3 mb-2 bg-white text-dark"
                    onClick={toggleRegisterModal}
                  >
                    {" "}
                    <Nav.Link className="text-white bg-dark">Register</Nav.Link>
                  </p>
            </>
          )}

          {(user  && user.user_type === 2) && (
          <NavDropdown title={user.email} id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/properties/favorites">My Favourites</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="getRoute">My Bids</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/properties/mylistings">My Listings</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/properties/new">Create New Listing</NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item  onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          )}

          {(user && user.user_type === 2) && (
            // <OverlayTrigger
            //   key="top"
            //   placement="top"
            //   overlay={
            //     <Tooltip id={`tooltip-"top"`}>
            //       <strong>Notifications</strong>
            //     </Tooltip>
            //   }
            // >
              <Nav.Link as={Link} to="/properties/notifications">
                <i className="fa fa-bell"></i>
                {(messages > 0) && <Badge pill bg="danger">{messages}</Badge>}
                {/* <Badge pill bg="danger">0</Badge> */}
                {/* <span class="d-inline-block d-md-none">Notifications</span> */}
              </Nav.Link>
            // </OverlayTrigger>
          )}

          {(user && user.user_type === 1) && (
          <NavDropdown title={user.email} id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to="/admin/pending">Pending Listings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      <Register
          show={showRegister}
          toggleRegisterModal={toggleRegisterModal}
        ></Register>
        <Login show= {showLogin}
           toggleLoginModal={toggleLoginModal}>
        </Login>
    </Navbar>
  );
};
