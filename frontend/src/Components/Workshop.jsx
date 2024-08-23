import React from "react";
import axios from "axios";
function Workshop(props) {
  const image = `${props.image}`;
  const email = localStorage.getItem("emailID");
  const workshopName = props.workshop;
  const backend = process.env.REACT_APP_BACKEND_SERVER;
  const WorkshopsignUp = async () => {
    try {
      const response = await axios.post(
        `${backend}/api/workshop/student/signup`,
        {
          WorkshopName: workshopName,
          hostName: props.name,
          studentEmail: email,
          date: props.date,
        }
      );
      if (response.data.success) {
        alert(`Registration Complete`);
      } else {
        alert(`Registration failed`);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        {/* <div className="workshop-job">{props.id}</div> */}
        <button onClick={WorkshopsignUp} className="workshop-btn" type="submit">
          SIGN UP NOW
        </button>
      </div>
    </div>
  );
}

export default Workshop;
