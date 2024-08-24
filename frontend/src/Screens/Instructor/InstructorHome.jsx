import React, { useState, useEffect } from "react";
import "../../CSS/Instructor.css";
import Footer from "../../Components/Footer";
import axios from "axios";
import RegisteredStudents from "../../Components/RegisteredStudents";

function InstructorHome() {
  const [profile, setProfile] = useState([]);
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const userId = sessionStorage.getItem("id");
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    image: "",
    body: "",
    date: "",
    job: "",
    workshop: "",
  });

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const fetchStudent = async () => {
    try {
      const response = await axios.post(`${backend}/api/workshop/instructor`, {
        workshopName: profile.workshop,
      });
      if (response.data && response.data.data) {
        console.log(response.data.data);
        setStudent(response.data.data);
      } else {
        setStudent([]); // Handle empty data gracefully
      }
    } catch (error) {
      console.error("Error fetching registration data", error);
      setStudent([]); // Handle errors by setting regData to an empty array
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await axios.post(`${backend}/api/workshop/profile`, {
        id: userId,
      });
      const profile = response.data.profileInfo;
      setProfile(profile);
      setFormData({
        name: profile.name,
        password: profile.password,
        image: profile.profile_pic || "",
        body: profile.description,
        date: profile.date,
        job: profile.job,
        workshop: profile.workshop,
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `${backend}/api/workshop/profile/update`,
        {
          id: userId,
          name: formData.name,
          password: formData.password,
          image: formData.image,
          body: formData.body,
          date: formData.date,
          job: formData.job,
          workshop: formData.workshop,
        }
      );
      setIsEditing(false);
      setProfile(response.data.profileInfo);
      fetchProfile();
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    fetchStudent();
  }, [formData]);

  return (
    <div className="home">
      <div className="Instructor_banner">
        <div className="instructor_header">Welcome Instructor</div>
      </div>

      <div className="Instructor_body_container">
        <div className="instruction_body">
          <div
            className="picture"
            style={
              !isEditing
                ? { backgroundImage: `url(${profile.profile_pic})` }
                : { backgroundColor: "white" }
            }
          >
            {isEditing ? (
              <>
                <label htmlFor="fileInput" className="fileInputLabel">
                  Change Image
                </label>

                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={convertToBase64}
                />
              </>
            ) : (
              <>
                {!profile.profile_pic && (
                  <div className="instructor_icon_container">
                    <i className="fa-regular fa-user  instructor_icon"></i>
                  </div>
                )}
              </>
            )}
          </div>
          <div style={{ height: "20px" }}></div>
          <div className="ins_header">Name: </div>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">{profile.name}</div>
          )}

          <div className="ins_header">Email: </div>

          <div className="ins_body">{profile.email}</div>

          <div className="ins_header">Password: </div>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">********</div>
          )}

          <div className="ins_header">Date: </div>
          {isEditing ? (
            <input
              type="name"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">{profile.date}</div>
          )}

          <div className="ins_header">Designation: </div>
          {isEditing ? (
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">{profile.job}</div>
          )}

          <div className="ins_header">Workshop description: </div>
          {isEditing ? (
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">{profile.description}</div>
          )}

          <div className="ins_header">Workshop Name: </div>
          {isEditing ? (
            <input
              type="text"
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              className="ins_body"
            />
          ) : (
            <div className="ins_body">{profile.workshop}</div>
          )}
          <div className="ins_header"></div>
          {isEditing ? (
            <button className="profile_edit" onClick={updateProfile}>
              SUBMIT
            </button>
          ) : (
            <button className="profile_edit" onClick={() => setIsEditing(true)}>
              EDIT <i className="fa-solid fa-user-pen"></i>
            </button>
          )}
        </div>
      </div>
      {student.length > 0 && (
        <div className="title_scafford">
          <div className="titleName">Registered Students:</div>
        </div>
      )}
      {student.length > 0 &&
        student.map((student, index) => (
          <RegisteredStudents
            name={student.studentName}
            email={student.studentEmail}
          />
        ))}
      <button onClick={handleLogout} className="instructor_logout">
        Logout
      </button>

      <div style={{ height: "100px" }}></div>
      <Footer />
    </div>
  );
}

export default InstructorHome;
