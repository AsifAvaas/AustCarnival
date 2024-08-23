import React from "react";

function RegisteredStudents(props) {
  return (
    <div className="workshop_event_container">
      <div className="workshop_event_body">
        <div
          className="event_info_head"
          style={{ marginBottom: "10px", fontSize: "30px" }}
        >
          Name: {props.name}
        </div>
        <div
          className="event_info_head"
          style={{ marginBottom: "10px", fontSize: "30px" }}
        >
          email: {props.email}
        </div>
      </div>
    </div>
  );
}

export default RegisteredStudents;
