import React from "react";

function StudentCard(props) {
  return (
    <div className="wrapper">
      <div className="class-card-student">
        <h3>{props.name}</h3>
      </div>
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
