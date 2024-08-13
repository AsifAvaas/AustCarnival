import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupDesign from "../../Components/SignupDesign";
import "../../CSS/signup.css";
import axios from "axios";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend}/api/login`, {
        email: formData.email,
        password: formData.password,
      });
      const data = response.data;
      if (data.success) {
        localStorage.setItem("id", data.userID);
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("emailID", data.email);
        localStorage.setItem("adminStatus", data.adminStatus);
        const { userType } = response.data;
        if (userType === "instructor") {
          navigate("/instructor/home");
        } else {
          navigate("/");
        }
      } else {
        console.log(data);
        alert(data.messege);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.messege || "An unexpected error occurred.");
    }
  };
  return (
    <div className="home flex">
      <SignupDesign />
      <div className="signup-container">
        <div className="form-container">
          <h1 className="header">Welcome Back!</h1>

          <div>
            <form onSubmit={submit}>
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
              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <Link className="linktoggle" to="/signup">
            Don't have an Account? Register now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
