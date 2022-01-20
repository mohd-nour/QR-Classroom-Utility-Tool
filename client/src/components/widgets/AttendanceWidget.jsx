import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useDispatch, useSelector } from "react-redux";
import { addStudentToSession, setSingleSession, finalizeSession, getSessions } from "../../actions/courses";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

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

function AttendanceWidget(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState({ studentId: "" });
  const Students = useSelector((state) => state.currentSession.attendedStudents);
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);
 
  useEffect(() => { 
      const interval = setInterval(() => {
        console.log("re rendering attendance");
        dispatch(setSingleSession(courseId, props.sessionNumber));
      },2000);
      return () => clearInterval(interval);
  }, [dispatch, props.sessionNumber, courseId]);

  const addStudentById = (e) => {
    e.preventDefault();
    if (studentData.studentId !== "" && studentData.studentId.length === 9) {
      if (
        Students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        dispatch(
          addStudentToSession(studentData, courseId, props.sessionNumber)
        );
      } else {
        swal("This student already took attendance!", { icon: "warning" });
      }
    } else {
      swal("Invalid entry!", { icon: "warning" });
    }
  };

  const FinalizeAttendance = () => {
    swal("Are you sure you would like to finalize taking attendance for this session?", {
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
        },
        confirm: {
          text: "Yes",
          value: true,
          visible: true,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch(finalizeSession(courseId, props.sessionNumber));
        dispatch(getSessions(courseId));
        navigate("/FinalizeAttendance");
      }
    });
  }
  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Taking Attendance -
            {" " + courseName + " " + courseNumber + " "}-
            Session {props.sessionNumber}
          </h1>
          <div id="card-section">{Students.map(createStudentCard)}</div>
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit={addStudentById}>
        <div className="addStudent-column">
          <h3 id="form-title">Add Student</h3>
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="ex: 2021XXXXX"
            id="studentId"
            className="addClass-input"
            value={studentData.studentId}
            onChange={(e) => setStudentData({ studentId: e.target.value })}
          ></input>
          <button type="submit" className="save-button">
            Add
          </button>
          <button type="button" className="clear-button"
            onClick={() => setStudentData({ studentId: '' })}
          >
            Clear
          </button>
          <button type="button" className="finalize-button"
            onClick={FinalizeAttendance}
          >
            Finalize attendance
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceWidget;
