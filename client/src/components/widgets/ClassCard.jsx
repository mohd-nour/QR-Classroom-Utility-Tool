import React from "react";

function ClassCard(props) {
  return (
    <div className="class-card">
      <h3>
        {props.courseName} {props.courseNumber}
      </h3>
      <p>
        {props.startTime} - {props.endTime}
      </p>
      <p>{props.schedule}</p>
    </div>
  );
}

export default ClassCard;
