import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import Card from "./Card";
import axios from "axios";

function Home_Event() {
  const [allEvent, setAllEvent] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(5);

  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const loadEvent = async () => {
    try {
      const response = await axios.post(`${backend}/api/displayevent`);
      const shuffledEvents = shuffleArray(response.data);
      setAllEvent(shuffledEvents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadEvent();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setCardsToShow(4);
      } else {
        setCardsToShow(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            allEvent.slice(0, cardsToShow).map((data) => (
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
