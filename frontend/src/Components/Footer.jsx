import React from "react";
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
              <li>Who we are</li>
              <li>Who care</li>
              <li>Our goal</li>
            </ul>
          </div>
          <div className="grid">
            <h2>Common Questions</h2>
            <ul>
              <li>FAQ's</li>
              <li>What is AUST CSE Carnival</li>
              <li>Organizers of AUST Carnival</li>
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
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
