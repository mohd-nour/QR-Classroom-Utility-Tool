import React from "react";
import Students from "../Students";
import StudentCard from "./StudentCard";
import { useLocation } from "react-router-dom";

function createStudentCard(student) {
  return <StudentCard name={student.studentName} mode="AttendanceRecord" />;
}

function GradeReport() {
  //const location = useLocation();
  //const { data } = location.state;
  return (
    <div className="dash-container">
      <div id="lower-section">
        <h1 className="title">EECE 442 - Attendance Report</h1>
        <div id="card-section">{Students.map(createStudentCard)}</div>
      </div>
    </div>
  );
}

export default GradeReport;
