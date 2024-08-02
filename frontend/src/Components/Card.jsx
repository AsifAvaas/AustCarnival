import React from "react";
import "../CSS/home.css";
function Card(props) {
  const image = `data:image/jpeg;base64,${props.image}`;
  return (
    <div className="card-body" style={{ backgroundImage: `url(${image})` }}>
      <i className={props.icon} style={{ zIndex: "10", fontSize: "90px" }}></i>
      <br />
      <div style={{ zIndex: "10" }}>{props.name}</div>
    </div>
  );
}

export default Card;
