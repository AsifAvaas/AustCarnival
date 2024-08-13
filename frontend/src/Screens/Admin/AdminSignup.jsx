import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../../CSS/signup.css";
import axios from "axios";

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    key: "",
    isAdmin: true,
  });
  const navigate = useNavigate();
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const admin_secret = process.env.REACT_APP_ADMIN_SECRET_KEY;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (formData.key !== admin_secret) {
        alert("Wrong admin key");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post(`${backend}/api/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        isAdmin: true,
      });
      const data = response.data;
      if (data.success) {
        navigate("/login");
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
    <div>
      <div className="home flex">
        <div className="signup-container">
          <div className="form-container">
            <h1 className="header">Create An Account as An Admin!</h1>

            <div>
              <form onSubmit={submit}>
                <input
                  className="input-container"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="UserName"
                />
                <input
                  className="input-container"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className="input-container"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <input
                  className="input-container"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <input
                  className="input-container"
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  placeholder="Admin secret key"
                />
                <button className="btn" type="submit">
                  Register
                </button>
              </form>
            </div>
            <Link className="linktoggle" to="/login">
              Already have an Account? Login now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
