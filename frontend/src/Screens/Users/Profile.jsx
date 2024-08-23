import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../CSS/profilePage.css";
import axios from "axios";
import RegisteredEvents from "../../Components/RegisteredEvents";
import AdminProfile from "../../Components/admin/AdminProfile";
import RegisteredWorkshops from "../../Components/RegisteredWorkshops";

export default function Profile() {
  const [regData, setRegData] = useState([]);
  const [WorkshopData, setWorkshopData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: profileData.password,
    image: "",
  });
  const isAdmin = localStorage.getItem("adminStatus");
  const emailID = localStorage.getItem("emailID");
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
    // if (!profileData.email) return;

    try {
      const response = await axios.post(`${backend}/api/getRegistration`, {
        email: emailID,
      });
      if (response.data && response.data.data) {
        // console.log(response.data.data);
        setRegData(response.data.data);
      } else {
        setRegData([]); // Handle empty data gracefully
      }
    } catch (error) {
      console.error("Error fetching registration data", error);
      setRegData([]); // Handle errors by setting regData to an empty array
    }
  };

  const fetchWorkshopData = async () => {
    try {
      const response = await axios.post(
        `${backend}/api/workshop/student/find`,
        {
          email: emailID,
        }
      );
      if (response.data && response.data.data) {
        console.log(response.data.data);
        setWorkshopData(response.data.data);
      } else {
        setWorkshopData([]); // Handle empty data gracefully
      }
    } catch (error) {
      console.error("Error fetching registration data", error);
      setWorkshopData([]); // Handle errors by setting regData to an empty array
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchRegData();
    fetchWorkshopData();
  }, []);
  // useEffect(() => {

  // }, [profileData.email]);

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
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="info_body"
            />
          ) : (
            <div className="info_body">{profileData.name}</div>
          )}

          <div className="info_head">Email:</div>
          {isEditing ? (
            <input
              className="info_body"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <div className="info_body">{profileData.email}</div>
          )}

          <div className="info_head">Password:</div>
          {isEditing ? (
            <div className="info_body">
              <input
                className="profile_input"
                type="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="info_body"> **********</div>
          )}
          {/* <div className="info_body">
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
          </div> */}

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

      {isAdmin === "false" || isAdmin === null ? (
        <>
          {regData.length > 0 && (
            <div className="title_scafford">
              <div className="titleName">Registered Events:</div>
            </div>
          )}
          {regData.length > 0 &&
            regData.map((registration, index) => (
              <RegisteredEvents
                name1={registration.name1}
                name2={registration.name2}
                name3={registration.name3}
                team={registration.team}
                name={registration.eventId.name}
                date={registration.eventId.date}
                icon={registration.eventId.icon}
              />
            ))}

          {WorkshopData.length > 0 && (
            <div className="title_scafford">
              <div className="titleName">Registered Workshops:</div>
            </div>
          )}
          {WorkshopData.length > 0 &&
            WorkshopData.map((workshop, index) => (
              <>
                <RegisteredWorkshops
                  event={workshop.WorkshopName}
                  name={workshop.hostName}
                  date={workshop.date}
                />
                {/* <div>{workshop.WorkshopName}</div>
                <div>{workshop.studentEmail}</div>
                <div>{workshop.studentName}</div>
                <div>{workshop.hostName}</div> */}
              </>
            ))}
        </>
      ) : (
        <AdminProfile />
      )}

      <div style={{ height: "100px" }}></div>
      <Footer />
    </div>
  );
}
