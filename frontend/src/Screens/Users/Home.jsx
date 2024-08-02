import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
export default function Home() {
  const [data, setdata] = useState("");

  const backend = process.env.REACT_APP_BACKEND_SERVER;

  const loadData = async () => {
    try {
      let response = await axios.post(`${backend}/api/food`, {
        name: "cake",
      });
      let data = response.data.data;
      setdata(data);
    } catch (e) {
      console.log(e);
    }
  };

  const img = `data:image/jpeg;base64,${data.image}`;

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="home-body">
        <div>{data.name}</div>
        <div>{data.type}</div>
        <div>
          <img src={img} alt={data.name} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

{
  /* <Event eventName={eventname} details={details} date={date} />
          <Event eventName={eventname} details={details} date={date} /> */
}
