import React from "react";

function RegisteredEvents(props) {
  return (
    <div className="reg_event_container">
      <div className="reg_event_body">
        <div className="reg_icon_container">
          <i class={props.icon}></i>
          {/* <div>{props.icon}</div> */}
        </div>
        <div className="reg_event_info">
          <div className="event_name">{props.name}</div>

          <div
            className="event_info_head"
            style={{ marginBottom: "10px", fontSize: "30px" }}
          >
            Team Name: {props.team}
          </div>
          <div className="event_info_head">Team Members:</div>
          <div className="event_body_info">Member 1: {props.name1}</div>
          <div className="event_body_info">Member 2: {props.name2}</div>
          <div className="event_body_info">Member 3: {props.name3}</div>
          <div style={{ marginTop: "20px" }}>Date : {props.date}</div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredEvents;
