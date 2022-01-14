import React from "react";
import { Link } from "react-router-dom";


function SessionCard(props) {
  return (
    <div className="card-container">
        <div className="class-card">
          <Link to="/Attendance" state={{data:props.courseData, sessionNumber: props.sessionNumber }}>
          <h3>
            Session {props.sessionNumber}
          </h3>
          </Link>
          <div></div>
        </div>
    </div>
  );
}

export default SessionCard;
