import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
  return (
    <Navbar bg = "light" sticky="top" >
        <Navbar.Collapse className="justify-content-center">
            <Link className = "App-link" to="/">
                <Navbar.Brand > NYC ROUTE </Navbar.Brand>
            </Link>
        </Navbar.Collapse> 
        <Navbar.Collapse className="justify-content-end">
            <Link className = "App-link" to="/login">
                <Navbar.Brand > Sign Up </Navbar.Brand>
            </Link>
        </Navbar.Collapse> 
    </Navbar>
  );
};

export default NavBar;
