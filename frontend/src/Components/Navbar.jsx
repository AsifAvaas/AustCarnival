import React, { useState } from "react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import "../CSS/navbar.css";
import logo from "../images/logo-white.png";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAdmin = localStorage.getItem("adminStatus");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const isLoggedIN = localStorage.getItem("authToken");
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";
  return (
    <div
      className={`navbar-pic ${!isHomePage ? "navbar-pic-small" : ""} ${
        isProfilePage ? "navbar-pic-profile" : ""
      }`}
    >
      <div className="navbar-scaffold">
        <div className="navbar">
          <Link to="/">
            <img className="carnival-logo" src={logo} alt="Logo" />
          </Link>
          {!isProfilePage ? (
            <ul>
              <li>
                <NavLink className="link" to="/">
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink className="link" to="/event">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink className="link" to="/gallery">
                  Gallery
                </NavLink>
              </li>
              <li>
                <div className="profile-container" onClick={toggleDropdown}>
                  <i className="fa-solid fa-user link profile"></i>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      {!isLoggedIN ? (
                        <>
                          <li>
                            <a href="/signup">Sign Up</a>
                          </li>
                          <li>
                            <a href="/login">Login</a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a href="/profile">Profile</a>
                          </li>
                          <li>
                            <div className="logout" onClick={Logout}>
                              Logout
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          ) : (
            <div className="my_profile">My Profile </div>
          )}
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="welcome">
          <div className="welcome-inside">
            {isAdmin === "true" ? (
              <div className="admin_welcome">WELCOME ADMIN</div>
            ) : (
              <ul>
                <li>WELCOME TO</li>
                <li>AUST CSE CARNIVAL</li>
                <li>4.0</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
