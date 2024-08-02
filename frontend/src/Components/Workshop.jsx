import React from "react";

function Workshop(props) {
  const image = `data:image/jpeg;base64,${props.image}`;
  return (
    <div className="workshop-body">
      <div
        className="workshop-pic"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="workshop-description">
        <div className="workshop-header">{props.workshop}</div>
        <div className="commentary">Meet the Host:</div>
        <div className="workshop-host">{props.name}</div>
        <div className="workshop-job">{props.job}</div>
        <div className="commentary">About the Event:</div>
        <div className="workshop-job">{props.description}</div>
        <div className="commentary">Schedule:</div>
        <div className="workshop-job">{props.date}</div>
        <button className="workshop-btn" type="submit">
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Workshop;
