import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import "../CSS/navbar.css";
import logo from "../images/logo-white.png";
function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className={`navbar-pic ${!isHomePage ? "navbar-pic-small" : ""}`}>
      <div className="navbar">
        <Link to="/">
          <img className="carnival-logo" src={logo} alt="Logo" />
        </Link>
        <ul>
          <li>
            <NavLink className="link" to="/">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/signup">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/registration">
              REGISTRATION
            </NavLink>
          </li>
          <li>
            <i className="fa-solid fa-user link"></i>
          </li>
        </ul>
      </div>
      {location.pathname === "/" && (
        <div className="welcome">
          <div className="welcome-inside">
            <ul>
              <li>WELCOME TO</li>
              <li>AUST CSE CARNIVAL</li>
              <li>4.0</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
