import React from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";
// import { useLocation } from "react-router-dom";

function createStudentCard(student) {
  return (
    <StudentCard
      key={student.id}
      name={student.studentName}
      mode="AttendanceRecord"
    />
  );
}

function GradeReport() {
  //const location = useLocation();
  //const { data } = location.state;
  return (
    <div className="dash-container">
      <h1 className="title">EECE 502 - Attendance Report</h1>
      <div id="card-section">{Students.map(createStudentCard)}</div>
    </div>
  );
}

export default GradeReport;
