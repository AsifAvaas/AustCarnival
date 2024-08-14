import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import axios from "axios";

function NewEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    date: "",
    image: "",
    icon: "",
    price: "",
  });
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  };
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`${backend}/api/event/create`, {
        name: formData.name,
        body: formData.body,
        date: formData.date,
        image: formData.image,
        icon: formData.icon,
        price: formData.price,
      });
      const data = response.data;
      if (data.success) {
        navigate("/event");
      } else {
        alert("New event failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home">
      <Navbar />
      <div className="new_event_container">
        <div className="new_event_body">
          <h1 className="new_event_title">Add a new Event</h1>
          <form onSubmit={submit}>
            <div className="form_lebel">Name:</div>
            <input
              className="event_input_container"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name of the event"
            />
            <div className="form_lebel">Body:</div>
            <textarea
              className="event_input_container"
              type="text"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Event body"
            />
            <div className="form_lebel">Date:</div>
            <input
              className="event_input_container"
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
            />
            <div className="form_lebel">Icon:</div>
            <input
              className="event_input_container"
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Font Awesome icon class"
            />
            <div className="form_lebel">Price:</div>
            <input
              className="event_input_container"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Registration price"
            />
            <div className="form_lebel">Image:</div>
            <input
              className="event_input_container"
              type="file"
              accept="image/*"
              onChange={convertToBase64}
            />
            {formData.image && (
              <div className="image_preview">
                <img
                  src={formData.image}
                  alt="Uploaded Event"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              </div>
            )}
            <button className="btn" type="submit">
              Create new Event
            </button>
          </form>
        </div>
        {/* <div style={{ height: "100px" }}>ads</div> */}
      </div>
      <Footer />
    </div>
  );
}

export default NewEvent;
