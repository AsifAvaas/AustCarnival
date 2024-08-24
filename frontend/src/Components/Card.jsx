import React from "react";
import "../CSS/home.css";
function Card(props) {
  // const image = `data:image/jpeg;base64,${props.image}`;
  return (
    <div
      className="card-body"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <i className={`${props.icon} card_icon`}></i>
      <br />
      <div className="card_subtitle"> {props.name}</div>
    </div>
  );
}

export default Card;
