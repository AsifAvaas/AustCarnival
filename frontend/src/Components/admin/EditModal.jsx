import React, { useState, useEffect } from "react";
import "../../CSS/AdminEvent.css";
import ReactDom from "react-dom";
import axios from "axios";

function EditModal({ isOpen, onRequestClose, event }) {
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    price: "",
    date: "",
    icon: "",
    image: "",
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
  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        body: event.body,
        price: event.price,
        date: event.date,
        icon: event.icon,
        image: event.image,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backend}/api/event/update/${event._id}`,
        formData
      );
      if (response.data.success) {
        // alert("Event updated successfully");
        onRequestClose(); // Close the modal after a successful update
      } else {
        alert(response.data.message || "Failed to update event");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the event");
    }
  };

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div className="modal_overlay">
        <div className="modal_container">
          <div className="modal_scaffold">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal_input_group">
                <label>Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="modal_input_group">
                <label>Description</label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                />
              </div>
              <div className="modal_input_group">
                <label>Price</label>
                <input
                  type="name"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="modal_input_group">
                <label>Date</label>
                <input
                  type="name"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="modal_input_group">
                <label>Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                />
              </div>
              <div className="modal_input_group">
                <label>Current image </label>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Event"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={convertToBase64}
                />
              </div>
              <div className="modal_actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onRequestClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default EditModal;
