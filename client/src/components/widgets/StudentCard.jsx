import React from "react";

function StudentCard(props) {
  return (
    <div className="card-container">
      <div className="student-card">
        <div className="avatar"></div>
        <h3 className="student-name">{props.name}</h3>
        <h3 className="student-name">{props.id}</h3>
      </div>
      <button onClick={() => {}} className="uil uil-times remove-icon"></button>
      {props.mode === "AttendanceRecord" && (
        <div className="right-card-section">
          <h3>62/70</h3>
          <h3>Sessions</h3>
          <br />
          <h3>Grade</h3>
          <h3>97%</h3>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
