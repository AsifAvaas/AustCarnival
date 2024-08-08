import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/registration.css";
import axios from "axios";
function RegistrationForm({ onSuccess }) {
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const { id } = useParams();
  const main_email = localStorage.getItem("emailID");
  const [formData, setFormData] = useState({
    name1: "",
    main_email: main_email,
    roll1: "",
    name2: "",
    email2: "",
    roll2: "",
    name3: "",
    email3: "",
    roll3: "",
    team: "",
    event_name: id,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const registrationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend}/api/registration`, {
        name1: formData.name1,
        main_email: formData.main_email,
        roll1: formData.roll1,
        name2: formData.name2,
        email2: formData.email2,
        roll2: formData.roll2,
        name3: formData.name3,
        email3: formData.email3,
        roll3: formData.roll3,
        team: formData.team,
        event_name: formData.event_name,
      });
      const data = response.data;
      if (data.success) {
        onSuccess();
      } else {
        if (Array.isArray(data.messege)) {
          alert(
            data.messege[0].msg || "Something went wrong, please try again."
          );
        } else {
          alert(data.messege || "Something went wrong, please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.messege || "An unexpected error occurred.");
    }
  };
  return (
    <div className="reg-form-scaffold">
      <div className="reg-form-container">
        <form onSubmit={registrationSubmit}>
          <div className="personcount">For 1st Member:</div>
          <div className="reg-label">Full Name:</div>
          <input
            type="text"
            className="reginput"
            name="name1"
            onChange={handleChange}
            placeholder="Name"
          />
          <div className="reg-label">Roll:</div>
          <input
            type="text"
            className="reginput"
            name="roll1"
            onChange={handleChange}
            placeholder="Roll"
          />
          <div className="reg-label">Email:</div>
          <input
            type="email"
            className="reginput"
            name="main_email"
            value={main_email}
            readOnly
            placeholder={main_email}
          />
          <div className="personcount">For 2nd Member:</div>
          <div className="reg-label">Full Name:</div>
          <input
            type="text"
            className="reginput"
            name="name2"
            onChange={handleChange}
            placeholder="Name"
          />
          <div className="reg-label">Roll:</div>
          <input
            type="text"
            className="reginput"
            name="roll2"
            onChange={handleChange}
            placeholder="Roll"
          />
          <div className="reg-label">Email:</div>
          <input
            type="email"
            className="reginput"
            name="email2"
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="personcount">For 3rd Member:</div>
          <div className="reg-label">Full Name:</div>
          <input
            type="text"
            className="reginput"
            name="name3"
            onChange={handleChange}
            placeholder="Name"
          />
          <div className="reg-label">Roll:</div>
          <input
            type="text"
            className="reginput"
            name="roll3"
            onChange={handleChange}
            placeholder="Roll"
          />
          <div className="reg-label">Email:</div>
          <input
            type="email"
            className="reginput"
            name="email3"
            onChange={handleChange}
            placeholder="Email"
          />
          <div style={{ height: "40px" }}></div>
          <div className="reg-label">Team Name:</div>
          <input
            type="text"
            className="reginput"
            name="team"
            onChange={handleChange}
            placeholder="Name"
          />
          <div style={{ height: "40px" }}></div>
          <div className="reg-label">Name Of The Event:</div>
          <input
            type="text"
            className="reginput"
            name="event_name"
            value={JSON.stringify(id)}
            readOnly
            placeholder={id}
          />
          <div style={{ height: "40px" }}></div>
          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
