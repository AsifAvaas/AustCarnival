import React from "react";

function RegisteredWorkshops(props) {
  return (
    <div className="workshop_event_container">
      <div className="workshop_event_body">
        <div
          className="event_info_head"
          style={{ marginBottom: "10px", fontSize: "30px" }}
        >
          {props.event}
        </div>
        <div
          className="event_info_head"
          style={{ marginBottom: "10px", fontSize: "30px" }}
        >
          Host: {props.name}
        </div>
        <div style={{ marginTop: "20px" }}>Date : {props.date}</div>
      </div>
    </div>
  );
}

export default RegisteredWorkshops;
