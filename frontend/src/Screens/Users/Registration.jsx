import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function Registration() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home">
      <Navbar />
      Registration
      <div style={{ height: "1500px" }}></div>
      <Footer />
    </div>
  );
}

export default Registration;
