import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function Success() {
  return (
    <div className="home registration">
      <Navbar />
      <div className="registration-page">
        <div className="reg-header">
          <div className="reg-head">Register for an event:</div>
          <div className="reg-body">
            To register for an event at the AUST CSE Carnival, participants can
            select their desired activity and complete a single-registration
            process per event. This ensures each participant can easily manage
            their preferences and secure their spot in their chosen competition
            or workshop.
          </div>
        </div>
        <div className="loader">
          <div className="progressbar complete"></div>
        </div>
      </div>
      <div className="success_container">
        <div className="success-head">Registration Successful!</div>
        <div className="success-body">
          Your response has been recorded successfully
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
