import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


export default function NavBar() {

  return (
    <div classname="navbar">
      <nav>
        <Link to="/">Listings</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>

  )
}