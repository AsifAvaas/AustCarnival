import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import "../../CSS/eventPage.css";
import Event from "../../Components/Event";
import Footer from "../../Components/Footer";
import axios from "axios";
import EventList from "../../Components/admin/EventList";
import { useHref } from "react-router-dom";
function EventPage() {
  const [allEvent, setAllEvent] = useState([]);
  const { id } = useParams();
  const isAdmin = localStorage.getItem("adminStatus");
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
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [id, allEvent]);
  useEffect(() => {
    loadEvent();
  }, []);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="home events">
      <Navbar />
      {isAdmin === "false" || isAdmin === null ? (
        <div className="eventpage">
          <div className="header">
            <div className="head">Explore our Events</div>
            <div className="body">
              Welcome to discover a dynamic lineup of activities at the AUST CSE
              Carnival, featuring workshops by industry experts, competitive
              challenges, and interactive showcases of cutting-edge technology.
              Stay updated and plan your experience to make the most of this
              exciting event!
            </div>
          </div>
          <div>
            {allEvent.length > 0 &&
              allEvent.map((data, index) => (
                <div key={data.id} id={data.name}>
                  <Event
                    index={index}
                    eventName={data.name}
                    details={data.body}
                    date={data.date}
                    image={data.image}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <EventList />
      )}

      <Footer />
    </div>
  );
}

export default EventPage;
