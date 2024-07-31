import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
export default function Home() {
  const [data, setdata] = useState("");

  const backend = process.env.REACT_APP_BACKEND_SERVER;

  const loadData = async () => {
    try {
      let response = await axios.post(`${backend}/api/data`, {
        gender: "male",
      });
      let data = response.data.data;
      console.log(data.name);
      console.log(backend);
      setdata(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="home-body">{data.name}</div>
      <Footer />
    </div>
  );
}
