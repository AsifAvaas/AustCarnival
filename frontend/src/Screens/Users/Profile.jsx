import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../CSS/profilePage.css";
import axios from "axios";

export default function Profile() {
  const [image, setImage] = useState("");
  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const userId = localStorage.getItem("id");
  // console.log(userId);
  const fetchProfile = async () => {
    try {
      const response = await axios.post(`${backend}/api/profile`, {
        id: userId,
      });
      console.log(response.data.profileInfo);
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="profile-img-container">
        <div className="profile-img">
          <i class="fa-regular fa-user abc"></i>
        </div>
      </div>
      <div className="profile-info-container">
        <div>ajhgbfsai</div>
        <input accept="image/*" type="file" onChange={convertToBase64} />
        <img src={image} alt="" width={100} height={100} />
      </div>
      <div style={{ height: "1000px" }}></div>
      <Footer />
    </div>
  );
}
