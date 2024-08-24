import React, { useState, useEffect } from "react";
import "../../CSS/AdminWorkshop.css";
import image from "../../images/bkash.jpg";
import axios from "axios";
import ToggleSwitch from "./ToggleSwitch";
function WorkshopList() {
  const [allWorkshop, setAllWorkshop] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const loadWorkshop = async () => {
    try {
      const response = await axios.post(`${backend}/api/workshop/all`);
      setAllWorkshop(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post(`${backend}/api/workshop/create`, {
        email: formData.email,
        password: formData.password,
      });
      const data = response.data;
      if (data.success) {
        alert("new instructior created");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        loadWorkshop();
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
  useEffect(() => {
    loadWorkshop();
  }, []);
  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await axios.delete(
        `${backend}/api/workshop/delete/${userId}`
      );
      if (response.data.success) {
        alert("Instructor deleted successfully");

        loadWorkshop();
      } else {
        alert(response.data.message || "Failed to delete instructor");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the instructor");
    }
  };

  const toggleApproval = async (userId, isApproved) => {
    try {
      let response = await axios.put(
        `${backend}/api/toggleapproval/${userId}`,
        {
          isApproved: !isApproved,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to toggle approval");
      }
      console.log("toggled");
      loadWorkshop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin_workshop_container">
      <div className="admin_workshop_scaffold">
        <div className="workshop_header">Assign a new Instructor:</div>
        <div className="admin_register_new">
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
            <input
              className="input-container"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <button className="btn" type="submit">
              Register
            </button>
          </form>
        </div>
        <div className="workshop_header">Assigned Workshops:</div>
        {allWorkshop.length > 0 &&
          allWorkshop.map((data, index) => (
            <div key={index} className="admin_workshop">
              <div
                className="workshop_pic"
                style={{ backgroundImage: `url(${data.profile_pic})` }}
              ></div>
              <div className="workshop_body">
                <div className="workshop_name">{data.workshop}</div>
                <div style={{ height: "10px" }}></div>

                <div className="workshop_host">Email: {data.email}</div>
                <div className="workshop_host">Instructor: {data.name}</div>
                <div>{data.job}</div>
                <div style={{ height: "20px" }}></div>
                <div>{data.description}</div>
                <div style={{ height: "20px" }}></div>
                <div>{data.date}</div>
                <div>
                  Approve Instructor:
                  <ToggleSwitch
                    checked={data.isApproved}
                    onChange={() => toggleApproval(data._id, data.isApproved)}
                  />
                </div>
                <button
                  className="workshop_delete"
                  onClick={() => handleDelete(data._id)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WorkshopList;
