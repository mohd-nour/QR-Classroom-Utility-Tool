import React from "react";

function ClassCard(props) {
  return (
    <div className="class-card">
      <h3>{props.course}</h3>
      <p>{props.time}</p>
      <p>{props.days}</p>
    </div>
  );
}

export default ClassCard;
