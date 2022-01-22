import React from "react";
import StudentCard from "./StudentCard";
import { useSelector } from "react-redux";

function createStudentCard(student) {
  return (
    <StudentCard
      key={student._id}
      name={student.name}
      id={student.instituteId}
      mode="removeDelete"
    />
  );
}

function GradeReport() {
  const sessions = useSelector((state) => state.sessions);
  const Students = useSelector((state) => state.students);
  console.log(sessions);
  console.log(Students);
  return (
    <div className="dash-container">
      <h1 className="title">EECE 502 - Attendance Report</h1>
      <div id="card-section">{Students.map(createStudentCard)}</div>
    </div>
  );
}

export default GradeReport;
