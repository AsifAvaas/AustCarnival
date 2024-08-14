import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/AdminEvent.css";
import axios from "axios";
import EditModal from "./EditModal";

function EventList() {
  const [allEvent, setAllEvent] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const backend = process.env.REACT_APP_BACKEND_SERVER;

  const loadEvent = async () => {
    try {
      const response = await axios.post(`${backend}/api/displayevent`);
      setAllEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${backend}/api/event/delete/${userId}`
      );
      if (response.data.success) {
        alert("Event deleted successfully");
        loadEvent();
      } else {
        alert(response.data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the event");
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const refreshEvents = () => {
    loadEvent();
    setIsEditModalOpen(false);
  };
  const newEvent = () => {
    navigate("/admin/event/new");
  };

  return (
    <div className="admin_event_container">
      <div className="admin_event_body">
        <button onClick={newEvent} className="new_event">
          Add a new Event
        </button>
        <div className="workshop_header">List of All Events:</div>
        {allEvent.length > 0 &&
          allEvent.map((data, index) => (
            <div key={index} className="admin_workshop">
              <div
                className="workshop_pic"
                style={{ backgroundImage: `url(${data.image})` }}
              ></div>
              <div className="workshop_body">
                <div className="workshop_name">{data.name}</div>
                <div> {data.body}</div>
                <div>Price: {data.price} Tk</div>
                <div>Date: {data.date}</div>
                <div>Logo: {data.icon}</div>
                <button
                  className="workshop_delete"
                  onClick={() => handleDelete(data._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  className="workshop_edit"
                  onClick={() => handleEdit(data)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                {isEditModalOpen && (
                  <EditModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    event={selectedEvent}
                    refreshEvents={refreshEvents}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventList;
