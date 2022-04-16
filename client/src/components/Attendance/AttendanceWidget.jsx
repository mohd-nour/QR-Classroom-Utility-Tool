import React, { useState, useEffect } from 'react';
import StudentCard from '../StudentCard/StudentCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudentToSession,
  setSingleSession,
  finalizeSession,
  getSessions,
  closeSession,
} from '../../actions/courses';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
//import io from "socket.io-client";
//const socket = io();

import { socket } from '../Authentication/LoginPage';

function createStudentCard(student) {
  return (
    <StudentCard
      name={student.name}
      key={student._id}
      id={student.instituteId}
      mode="Normal"
    />
  );
}

function AttendanceWidget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionNumber = useSelector(
    (state) => state.currentSession.sessionNumber
  );
  const [studentData, setStudentData] = useState({ studentId: '' });
  const Students = useSelector(
    (state) => state.currentSession.attendedStudents
  );
  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );

  useEffect(() => {
    const refresh = () => {
      console.log('Added student to session');
      dispatch(setSingleSession(courseId, sessionNumber));
    };
    dispatch(closeSession(courseId, sessionNumber, { closed: false }));
    socket.emit('JoinAttendance', { courseId, sessionNumber });
    socket.on('RefreshSession', refresh);
    return () => {
      socket.off('RefreshSession', refresh);
      socket.emit('LeaveAttendance', { courseId, sessionNumber });
      dispatch(closeSession(courseId, sessionNumber, { closed: true }));
    };
  }, [dispatch, sessionNumber, courseId]);

  const addStudentById = (e) => {
    e.preventDefault();
    if (studentData.studentId !== '' && studentData.studentId.length === 9) {
      if (
        Students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        dispatch(addStudentToSession(studentData, courseId, sessionNumber));
      } else {
        swal('This student already took attendance!', { icon: 'warning' });
      }
    } else {
      swal('Invalid entry!', { icon: 'warning' });
    }
  };

  const FinalizeAttendance = () => {
    swal(
      'Are you sure you would like to finalize taking attendance for this session?',
      {
        buttons: {
          cancel: {
            text: 'Cancel',
            value: false,
            visible: true,
          },
          confirm: {
            text: 'Yes',
            value: true,
            visible: true,
          },
        },
      }
    ).then((value) => {
      if (value) {
        dispatch(finalizeSession(courseId, sessionNumber));
        dispatch(getSessions(courseId));
        navigate('/FinalizeAttendance', { replace: true });
      }
    });
  };
  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h2 className="title">
            Taking Attendance -{' ' + courseName + ' ' + courseNumber + ' '}-
            Session {sessionNumber}
          </h2>
          {!Students.length ? (
            <div>
              <CircularProgress className="circular-progress" />
            </div>
          ) : (
            <div id="card-section">{Students.map(createStudentCard)}</div>
          )}
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit={addStudentById}>
        <div className="form-column">
          <h4 id="form-title">ADD ATTENDANCE</h4>
          <div className="input-container">
            <label>Student ID</label>
            <input
              name="studentId"
              placeholder="ex: 2021XXXXX"
              id="studentId"
              className="std-input"
              value={studentData.studentId}
              onChange={(e) => setStudentData({ studentId: e.target.value })}
            ></input>
          </div>
          <button type="submit" className="form-button">
            Add
          </button>
          <button
            type="button"
            className="secondary-button form-button"
            onClick={FinalizeAttendance}
          >
            Finalize
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceWidget;
