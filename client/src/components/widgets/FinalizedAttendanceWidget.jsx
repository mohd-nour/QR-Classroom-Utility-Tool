import React from "react";
import StudentCard from "./StudentCard";
import { useSelector } from "react-redux";

function createStudentCard(student) {
  return (
    <StudentCard
      name={student.name}
      key={student._id}
      id={student.instituteId}
      mode="removeDelete"
    />
  );
}

function FinalizedAttendanceWidget(props) {
  const currentSession = useSelector((state) => state.currentSession);
  const attendedStudents = currentSession.attendedStudents;
  const {courseId, courseName, courseNumber, courseStudents} = useSelector((state) => state.currentCourse);
  const currCourseStudents = useSelector((state) => state.students);
  const didntAttend = currCourseStudents.filter((student) => attendedStudents.find((nestedstudent) => student.name === nestedstudent.name) == null);
  console.log(attendedStudents);
  console.log(courseStudents);
  console.log(didntAttend);
  return (
    <div>
        <div id="lower-section">
        <h1 className="title">
        {courseName + " " + courseNumber + " "}-
        Session {currentSession.sessionNumber + " "} results
        </h1>
        <div className="main-panel">
            <h2 className="sub-title">Students who attended</h2>
        </div>
        <div id="card-section">{attendedStudents.map(createStudentCard)}</div>
        <div className="main-panel">
            <h2 className="sub-title">Students who didn't attend</h2>
        </div>
        <div id="card-section">{didntAttend.map(createStudentCard)}</div>
        </div>
  </div>
  );
}

export default FinalizedAttendanceWidget;


