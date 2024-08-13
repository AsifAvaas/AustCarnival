import React, { useState, useEffect } from "react";
import "../CSS/home.css";
import Workshop from "./Workshop";
import axios from "axios";
function Home_WorkShop() {
  const [allWorkshop, setAllWorkshop] = useState([]);

  const backend = process.env.REACT_APP_BACKEND_SERVER;

  const loadWorkshop = async () => {
    try {
      const response = await axios.post(`${backend}/api/workshop`);
      setAllWorkshop(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadWorkshop();
  }, []);

  return (
    <div className="home-workshop-container">
      <div className="workshop-event">
        <div className="event-header">Our Workshops:</div>
        <div className="event-subtitle">
          Join our workshops hosted by industry experts and seasoned
          professionals, offering valuable insights and hands-on learning
          experiences. These sessions provide an opportunity to enhance your
          skills, network with leaders in the field, and stay updated on the
          latest trends and technologies.
        </div>
        <div className="workshop-shortcut">
          {allWorkshop.length > 0 &&
            allWorkshop.map((data) => (
              <div key={data.id} className="workshp-cards">
                <Workshop
                  workshop={data.workshop}
                  name={data.name}
                  job={data.job}
                  description={data.description}
                  date={data.date}
                  image={data.profile_pic}
                />
              </div>
            ))}
          {/* <div className="workshp-cards">
            <Workshop
              workshop={workshop}
              name={name}
              job={job}
              description={description}
              date={date}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home_WorkShop;
