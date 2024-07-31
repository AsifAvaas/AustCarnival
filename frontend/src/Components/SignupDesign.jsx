import React from "react";
import "../CSS/SignupLeft.css";
import logo from "../images/logo-white.png";
function SignupDesign() {
  return (
    <div className="signup-design">
      <div className="ellipse ellpse1"></div>
      <div className="ellipse ellpse2"></div>
      <div className="ellipse ellpse3"></div>

      <div className="image-container">
        <img src={logo} alt="carnival logo" />
      </div>
    </div>
  );
}

export default SignupDesign;
