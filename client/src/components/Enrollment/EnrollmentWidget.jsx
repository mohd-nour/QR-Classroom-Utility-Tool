import React, { useState, useEffect } from 'react';
import StudentCard from '../StudentCard/StudentCard';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents, addStudent } from '../../actions/courses';
import swal from 'sweetalert';
import { CircularProgress } from '@material-ui/core';
//import io from "socket.io-client";
//const socket = io();

import { socket } from '../Authentication/LoginPage';

var createStudentCardWrapped = function (courseIdParam) {
  return function createStudentCard(student) {
    if (student) {
      return (
        <StudentCard
          key={student._id}
          id={student.instituteId}
          courseId={courseIdParam}
          name={student.name}
          mode="Normal"
        />
      );
    }
  };
};

function EnrollmentWidget() {
  const dispatch = useDispatch();

  //const [joinedEnrollment, setJoinedEnrollment] = useState(false);

  const students = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    studentId: '',
  });

  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );

  useEffect(() => {
    const refresh = () => {
      console.log('Added student enrollment');
      dispatch(getStudents(courseId));
    };
    socket.emit('JoinEnrollment', courseId);
    socket.on('RefreshEnrollment', refresh);

    return () => {
      socket.off('RefreshEnrollment', refresh);
      socket.emit('LeaveEnrollment', courseId);
    };
  }, [dispatch, courseId]);

  // if there are no students with an id equal to state, add student

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentData.studentId !== '' && studentData.studentId.length === 9) {
      if (
        students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        dispatch(addStudent(courseId, studentData.studentId));
      } else {
        swal('Student is already enrolled!', { icon: 'warning' });
      }
    } else {
      swal('Invalid Entry', { icon: 'warning' });
    }
  };

  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h2 className="title">
            Student Enrolment -{' ' + courseName + ' ' + courseNumber}
          </h2>
          {!students.length ? (
            <div>
              <CircularProgress className="circular-progress" />
            </div>
          ) : (
            <div id="card-section">
              {students.map(createStudentCardWrapped(courseId))}
            </div>
          )}
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="form-column">
          <h4 id="form-title">ADD STUDENT</h4>
          <div className="input-container">
            <label>Student ID</label>
            <input
              name="studentId"
              placeholder="ex: 2021XXXXX"
              id="studentId"
              className="std-input"
              value={studentData.studentId}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  studentId: e.target.value,
                })
              }
            ></input>
          </div>
          <button type="submit" className="form-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentWidget;
