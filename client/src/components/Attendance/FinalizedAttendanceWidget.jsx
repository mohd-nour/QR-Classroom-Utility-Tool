import React from 'react';
import StudentCard from '../StudentCard/StudentCard';
import { useSelector } from 'react-redux';

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
  const { courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );
  const courseStudents = useSelector((state) => state.students);
  const didntAttend = courseStudents.filter(
    (student) =>
      attendedStudents.find(
        (nestedstudent) => student.name === nestedstudent.name
      ) == null
  );
  return (
    <div>
      <div id="lower-section">
        <h2 className="title">
          {courseName + ' ' + courseNumber + ' '}- Session{' '}
          {currentSession.sessionNumber + ' '} results
        </h2>
        <div className="main-panel">
          <h3 className="sub-title">Students who attended</h3>
        </div>
        <div id="card-section">{attendedStudents.map(createStudentCard)}</div>
        <div className="main-panel">
          <h3 className="sub-title">Students who didn't attend</h3>
        </div>
        <div id="card-section">{didntAttend.map(createStudentCard)}</div>
      </div>
    </div>
  );
}

export default FinalizedAttendanceWidget;
