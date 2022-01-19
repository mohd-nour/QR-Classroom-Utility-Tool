import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useDispatch, useSelector } from "react-redux";
import { addStudentToSession } from "../../actions/courses";
import { getStudentsFromSession } from "../../actions/courses";
import swal from "sweetalert";

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
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState({ studentId: "" });
  const Students = useSelector((state) => state.currentSession);

  useEffect(() => { 
    const interval = setInterval(() => {
      console.log("re rendering attendance");
      dispatch(getStudentsFromSession(props.data.courseId, props.sessionNumber));
    },2000);
    return () => clearInterval(interval);
  }, [dispatch, props.data.courseId, props.sessionNumber]);

  const addStudentById = (e) => {
    e.preventDefault();
    if (studentData.studentId !== "" && studentData.studentId.length === 9) {
      if (
        Students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        dispatch(
          addStudentToSession(studentData, props.data.courseId, props.sessionNumber)
        );
      } else {
        swal("This student already took attendance!", { icon: "warning" });
      }
    } else {
      swal("Invalid entry!", { icon: "warning" });
    }
  };
  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Taking Attendance -
            {" " + props.data.courseName + " " + props.data.courseNumber + " "}-
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
            onChange={(e) => setStudentData({ studentId: e.target.value })}
          ></input>
          <button type="submit" className="save-button">
            Add
          </button>
          <button className="clear-button">Clear</button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceWidget;
