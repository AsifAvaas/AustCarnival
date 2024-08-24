import React from "react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import "../CSS/footer.css";

function Footer() {
  return (
    <div className="footer-back">
      <div className="sponsor-container">
        <div className="sponsor">
          <img
            className="cefalo"
            src="https://www.cefalo.com/hubfs/logo/logo-color.svg"
            alt="cefalo logo"
          />
        </div>
        <div className="sponsor">
          <div className="title">
            <h1>HOSTED BY</h1>
            <h1>AUST CSE SOCIETY</h1>
          </div>
        </div>
      </div>
      <div className="footer-front">
        <div className="footer-container">
          <div className="grid">
            <h2>About Us</h2>
            <ul>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  Who we are
                </Link>
              </li>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  Who care
                </Link>
              </li>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  Our goal
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid">
            <h2>Common Questions</h2>
            <ul>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  What is AUST CSE Carnival
                </Link>
              </li>
              <li>
                <Link className="link" style={{ fontSize: "15px" }} to="/faq">
                  Organizers of AUST Carnival
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid">
            <h2>Contact Us</h2>
            <ul>
              <li>Ahsanullah University of Science and Technology</li>
              <li>
                141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208.
              </li>
              <li>Tel. (8802) 8870422, Ext. 107, 114, Fax : (8802) 8870418</li>
              <li>Email: info@aust.edu, regr@aust.edu</li>
            </ul>
          </div>
          <div className="grid">
            <h2>Socials</h2>
            <ul>
              <li>
                <a
                  className="link"
                  style={{ fontSize: "15px" }}
                  href="https://www.facebook.com/asif.avaas.52"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="link"
                  style={{ fontSize: "15px" }}
                  href="https://github.com/AsifAvaas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
