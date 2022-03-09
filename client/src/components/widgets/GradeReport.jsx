import React from 'react';
import StudentCard from './StudentCard/StudentCard';
import { useSelector } from 'react-redux';

function createStudentCard(student) {
  return (
    <StudentCard
      key={student._id}
      name={student.name}
      id={student.instituteId}
      attendanceRecord={student.attendanceRecord}
      totalNbOfSessions={student.totalNbOfSessions}
      mode="GradeReport"
    />
  );
}

function GradeReport() {
  const sessions = useSelector((state) => state.sessions);
  const Students = useSelector((state) => state.students);
  const totalNbOfSessions = sessions.length;
  console.log(sessions);
  console.log(Students);
  Students.forEach((student) => {
    var attendanceRecord = 0;
    sessions.forEach((session) => {
      if (
        session.attendedStudents.find(
          (sessionStudent) => sessionStudent._id === student._id
        )
      ) {
        attendanceRecord += 1;
      }
    });
    student.attendanceRecord = attendanceRecord;
    student.totalNbOfSessions = totalNbOfSessions;
    attendanceRecord = 0;
  });
  return (
    <div className="dash-container">
      <h2 className="title">EECE 502 - Attendance Report</h2>
      <div id="card-section">{Students.map(createStudentCard)}</div>
    </div>
  );
}

export default GradeReport;
