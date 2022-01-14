import React from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";

function createStudentCard(student) {
  return <StudentCard name={student.studentName} mode="Normal" />;
}

function AttendanceWidget(props) {
  console.log(props.sessionNumber);
  console.log(props.data);
  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Taking Attendance -
            {" " + props.data.courseName + " " + props.data.courseNumber+ " "}
            - Session {props.sessionNumber}
          </h1>
          <div id="card-section">{Students.map(createStudentCard)}</div>
        </div>
      </div>
      <form autoComplete="off" noValidate>
        <div className="addStudent-column">
          <h3 id="form-title">Add Student</h3>
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="ex: 2021XXXXX"
            id="studentId"
            className="addClass-input"
          ></input>
          <button type="submit" className="save-button">
            Add
          </button>
          <button className="clear-button">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceWidget;
