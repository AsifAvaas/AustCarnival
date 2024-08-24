import React from "react";

function RegisteredStudents(props) {
  return (
    <div className="workshop_event_container">
      <div className="workshop_event_body">
        <div className="instructor_info_head">Name: {props.name}</div>
        <div className="instructor_info_head">email: {props.email}</div>
      </div>
    </div>
  );
}

export default RegisteredStudents;
