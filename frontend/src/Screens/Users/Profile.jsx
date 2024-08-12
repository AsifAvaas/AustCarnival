import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../CSS/profilePage.css";
import axios from "axios";

export default function Profile() {
  const [regData, setRegData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: profileData.password,
    image: "",
  });
  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setFormData({
        ...formData,
        image: reader.result, // Update the image property
      });
    };

    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const userId = localStorage.getItem("id");
  const fetchProfile = async () => {
    try {
      const response = await axios.post(`${backend}/api/profile`, {
        id: userId,
      });
      const profile = response.data.profileInfo;
      setProfileData(profile);
      setFormData({
        name: profile.name,
        email: profile.email,
        password: profile.password,
        image: profile.profile_pic || "",
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const fetchRegData = async () => {
    try {
      const response = await axios.post(`${backend}/api/getRegistration`, {
        email: profileData.email,
      });
      setRegData(response.data.data);
      console.log(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    fetchRegData();
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const updateProfile = async () => {
    try {
      const response = await axios.post(`${backend}/api/profile/update`, {
        id: userId,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      });

      console.log("formdata", formData.name);
      console.log(response.data.profileInfo);
      setProfileData(response.data.profileInfo);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="profile-img-container">
        <div
          className="profile-img"
          onClick={() =>
            isEditing && document.getElementById("fileInput").click()
          }
          style={
            profileData.profile_pic
              ? { backgroundImage: `url(${profileData.profile_pic})` }
              : {}
          }
        >
          {!profileData.profile_pic && (
            <i class="fa-regular fa-user profile-icon"></i>
          )}

          {isEditing && (
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none", cursor: "pointer" }}
              onChange={convertToBase64}
            />
          )}
        </div>
      </div>
      <div className="profile-info-container">
        <div className="profile_info">
          <div className="info_head">Name:</div>
          <div className="info_body">
            {isEditing ? (
              <input
                className="profile_input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            ) : (
              profileData.name
            )}
          </div>
          <div className="info_head">Email:</div>
          <div className="info_body">
            {isEditing ? (
              <input
                className="profile_input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            ) : (
              profileData.email
            )}
          </div>
          <div className="info_head">Password:</div>
          <div className="info_body">
            {isEditing ? (
              <input
                className="profile_input"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            ) : (
              "**********"
            )}
          </div>
          {isEditing ? (
            <button className="profile_edit" onClick={updateProfile}>
              SUBMIT
            </button>
          ) : (
            <button className="profile_edit" onClick={() => setIsEditing(true)}>
              EDIT{"   "}
              <i className="fa-solid fa-user-pen"></i>
            </button>
          )}
        </div>
      </div>
      <div className="title_scafford">
        <div className="titleName">Registered Events:</div>
      </div>

      <div className="reg_event_container">
        <div className="reg_event_body">djhsa</div>
      </div>

      <div style={{ height: "1000px" }}></div>
      <Footer />
    </div>
  );
}
