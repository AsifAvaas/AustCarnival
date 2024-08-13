import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import Home_Event from "../../Components/Home_Event";
import Home_WorkShop from "../../Components/Home_WorkShop";
import WorkshopList from "../../Components/admin/WorkshopList";
export default function Home() {
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const isAdmin = localStorage.getItem("adminStatus");
  console.log(isAdmin);
  return (
    <div className="home">
      <Navbar />
      {isAdmin === "false" || isAdmin === null ? (
        <>
          <Home_Event />
          <Home_WorkShop />
        </>
      ) : (
        <WorkshopList />
      )}

      <Footer />
    </div>
  );
}
