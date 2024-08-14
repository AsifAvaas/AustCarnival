import React, { useState, useEffect } from "react";
import "../../CSS/AdminProfile.css";
import axios from "axios";
function AdminProfile() {
  const [allProfile, setAllProfile] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const userId = localStorage.getItem("id");

  const fetchProfile = async () => {
    try {
      const response = await axios.post(`${backend}/api/profile/all`, {
        id: userId,
      });

      if (response.data.success) {
        // console.log(response.data.profileInfo);
        setAllProfile(response.data.profileInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await axios.delete(
        `${backend}/api/profile/delete/${userId}`
      );
      if (response.data.success) {
        alert("Profile deleted successfully");

        fetchProfile();
      } else {
        alert(response.data.message || "Failed to delete profile");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the profile");
    }
  };

  return (
    <div className="admin_profile_container">
      <div className="admin_profile_scaffold">
        {allProfile.length > 0 &&
          allProfile.map((data, index) => (
            <div key={index} className="admin_workshop">
              <div
                className="workshop_pic"
                style={{ backgroundImage: `url(${data.profile_pic})` }}
              ></div>
              <div className="workshop_body">
                <div className="workshop_name">{data.name}</div>
                <div style={{ height: "10px" }}></div>

                <div className="workshop_host">Email: {data.email}</div>
                {data.isAdmin ? (
                  <>
                    <div className="workshop_host">Status: Admin</div>
                  </>
                ) : (
                  <>
                    <div className="workshop_host">Status: User</div>
                  </>
                )}

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

export default AdminProfile;
