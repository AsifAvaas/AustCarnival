import React from "react";
import bkashImage from "../images/bkash.jpg";
import rocketImage from "../images/rocket.jpg";
import nogodImage from "../images/nogod.jpg";
function Payment() {
  return (
    <div className="payment-container">
      <h1 className="heading">Payment Gateway:</h1>
      <p
        className="reg-body"
        style={{ textAlign: "center", paddingTop: "0px" }}
      >
        Choose your designated medium for payment for an event at the aust cse
        carnival
      </p>
      <div className="payment-route-container">
        <div className="payment_logo">
          <img src={bkashImage} alt="bkash logo" className="payment_image" />
          <p className="payment_name">Bkash</p>
        </div>
      </div>
      <div className="payment-route-container">
        <div className="payment_logo">
          <img src={rocketImage} alt="rocket logo" className="payment_image" />
          <p className="payment_name">Rocket</p>
        </div>
      </div>
      <div className="payment-route-container">
        <div className="payment_logo">
          <img src={nogodImage} alt="nogod logo" className="payment_image" />
          <p className="payment_name">Nogod</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
