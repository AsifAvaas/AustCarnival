import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Home_Event from "../../Components/Home_Event";
import Home_WorkShop from "../../Components/Home_WorkShop";
import WorkshopList from "../../Components/admin/WorkshopList";
export default function Home() {
  const isAdmin = localStorage.getItem("adminStatus");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Add event listener to update width on resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="home">
      <Navbar />
      {isAdmin === "false" || isAdmin === null ? (
        <>
          <Home_Event />
          <p>Screen width: {width}px</p>
          <Home_WorkShop />
        </>
      ) : (
        <WorkshopList />
      )}

      <Footer />
    </div>
  );
}
