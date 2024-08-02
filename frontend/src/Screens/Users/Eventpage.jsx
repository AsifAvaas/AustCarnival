import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import "../../CSS/eventPage.css";
import Event from "../../Components/Event";
import Footer from "../../Components/Footer";
import axios from "axios";
function EventPage() {
  const [allEvent, setAllEvent] = useState([]);

  const backend = process.env.REACT_APP_BACKEND_SERVER;

  const loadEvent = async () => {
    try {
      const response = await axios.post(`${backend}/api/displayevent`);
      setAllEvent(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadEvent();
  }, []);
  useEffect(() => {
    console.log("Updated allEvent:", allEvent);
  }, [allEvent]);
  // const eventname = "Programming competition";
  // const details =
  //   "Test your coding skills and problem-solving abilities in our annual Programming Contest! Compete against other talented programmers in a series of challenging problems that will put your algorithmic thinking to the test. Whether you're a beginner or an experienced coder, this contest is an excellent opportunity to learn and showcase your skills.";
  // const date = "12-15 july";
  return (
    <div className="home events">
      <Navbar />
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
              <div key={data.id}>
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
      <Footer />
    </div>
  );
}

export default EventPage;
