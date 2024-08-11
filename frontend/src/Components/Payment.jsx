import React from "react";
import bkashImage from "../images/bkash.jpg";
import rocketImage from "../images/rocket.jpg";
import nogodImage from "../images/nogod.jpg";
import axios from "axios";
function Payment() {
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const payBkash = async () => {
    try {
      const { data } = await axios.post(
        `${backend}/api/bkash/payment/create`,
        {
          amount: 52,
          orderId: 1,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(data);
      window.location.href = data.bkashURL;
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const checkOut = async () => {
    try {
      const { data } = await axios.post(`${backend}/api/payment`, {
        email: localStorage.getItem("emailID"),
        number: "01724345688",
        price: "1852",
      });
      // console.log(data);
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };
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
          <button onClick={payBkash} className="payment_name">
            Bkash
          </button>
        </div>
      </div>
      <div className="payment-route-container">
        <div className="payment_logo">
          <img src={rocketImage} alt="rocket logo" className="payment_image" />
          <button onClick={checkOut} className="payment_name">
            Rocket
          </button>
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
