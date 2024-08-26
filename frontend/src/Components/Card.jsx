import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
function Card(props) {
  const navigate = useNavigate();
  const handleEventClick = (id) => {
    navigate(`/event/${id}`);
  };
  return (
    <div
      className="card-body"
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={() => handleEventClick(props.name)}
    >
      <i className={`${props.icon} card_icon`}></i>
      <br />
      <div className="card_subtitle"> {props.name}</div>
    </div>
  );
}

export default Card;
