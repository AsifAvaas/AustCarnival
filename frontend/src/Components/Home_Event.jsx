import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import Card from "./Card";
import axios from "axios";

function Home_Event() {
  const [allEvent, setAllEvent] = useState([]);

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
  return (
    <div className="home-event-container">
      <div className="home-event">
        <div className="event-header">Our Events:</div>
        <div className="event-subtitle">
          Experience the excitement firsthand by visiting the AUST CSE Carnival
          events, where innovation meets celebration. Engage in a variety of
          activities, competitions, and exhibitions that showcase the creativity
          and talent of the CSE community.
        </div>

        <div className="event-shortcut">
          {allEvent.length > 0 &&
            allEvent.slice(0, 5).map((data) => (
              <div key={data.id} className="card-container">
                <Card name={data.name} icon={data.icon} image={data.image} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home_Event;
