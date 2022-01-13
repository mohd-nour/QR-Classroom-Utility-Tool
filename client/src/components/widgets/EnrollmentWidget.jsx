import React from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";

function createStudentCard(student) {
  return <StudentCard name={student.studentName} mode="Normal" />;
}

function EnrollmentWidget(props) {
  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Enrolling Students -
            {" " + props.data.courseName + " " + props.data.courseNumber}
          </h1>
          <div id="card-section">{Students.map(createStudentCard)}</div>
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit>
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
          <button onClick className="clear-button">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentWidget;
