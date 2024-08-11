import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import RegistrationForm from "../../Components/RegistrationForm";
import Payment from "../../Components/Payment";
function Registration() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleFormSuccess = () => {
    setIsFormSubmitted(true);
  };
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
          <div className="progressbar"></div>
        </div>
      </div>

      <RegistrationForm />

      <Footer />
    </div>
  );
}

export default Registration;
