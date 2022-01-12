import React from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";

function createStudentCard(student) {
  return <StudentCard name={student.studentName} mode="Normal" />;
}

function AttendanceWidget(props) {
  return (
    <div className="dash-container">
      <div id="lower-section">
        {/* <h1 className="title">{data} - Taking Attendance - Session 12</h1> */}
        <h1 className="title">{props.data.courseName + " " + props.data.courseNumber} - Taking Attendance</h1>
        <div id="card-section">{Students.map(createStudentCard)}</div>
      </div>
    </div>
  );
}

export default AttendanceWidget;
