import React,{ useState } from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";

function createStudentCard(student) {
  return <StudentCard name={student.studentName} mode="Normal" />;
}

function AttendanceWidget(props) {
  [student, setStudent] = useState({studentId: ''});

  const addStudentById = () => {
    
  }
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
      <form autoComplete="off" noValidate onSubmit={addStudentById}>
        <div className="addStudent-column">
          <h3 id="form-title">Add Student</h3>
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="ex: 2021XXXXX"
            id="studentId"
            className="addClass-input"
            onChange={(e) => setStudent({studentId: e.target.value})}
          ></input>
          <button type="submit" className="save-button">
            Add
          </button>
          <button className="clear-button" type="submit">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceWidget;
