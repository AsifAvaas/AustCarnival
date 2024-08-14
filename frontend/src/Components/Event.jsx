import React from "react";
import "../CSS/eventPage.css";
import { useNavigate } from "react-router-dom";
function Event(props) {
  const navigate = useNavigate();
  // const image = `data:image/jpeg;base64,${props.image}`;
  // const image = `${props.image}`;
  return (
    <div style={{ marginBottom: "60px" }}>
      <hr style={{ color: "rgb(10, 132, 15)" }} />
      <div className="event-item">
        <div className="inside-event-item">
          {props.index % 2 ? (
            <>
              <div
                className="eventpic"
                style={{ backgroundImage: `url(${props.image})` }}
              >
                <div className="content">{props.date}</div>
              </div>
              <div className="event-details">
                <div className="name">{props.eventName}</div>
                <div className="details">{props.details}</div>
                <button
                  className="event-btn"
                  onClick={() => {
                    navigate(`/registration/${props.eventName}`);
                  }}
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="event-details">
                <div className="name">{props.eventName}</div>
                <div className="details">{props.details}</div>
                <button
                  className="event-btn"
                  onClick={() => {
                    navigate(`/registration/${props.eventName}`);
                  }}
                >
                  {" "}
                  Register
                </button>
              </div>
              <div
                className="eventpic"
                style={{ backgroundImage: `url(${props.image})` }}
              >
                <div className="content">{props.date}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Event;
