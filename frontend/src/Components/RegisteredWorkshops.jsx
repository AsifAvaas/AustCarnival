import React from "react";

function RegisteredWorkshops(props) {
  return (
    <div className="workshop_event_container">
      <div className="workshop_event_body">
        <div className="workshop_info_head">{props.event}</div>
        <div className="workshop_info_head">Host: {props.name}</div>
        <div style={{ marginTop: "20px" }}>Date : {props.date}</div>
      </div>
    </div>
  );
}

export default RegisteredWorkshops;
