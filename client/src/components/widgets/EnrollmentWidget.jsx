import React, { useEffect } from "react";
import StudentCard from "./StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "../../actions/courses";

function createStudentCard(student) {
  return <StudentCard student={student} mode="Normal" />;
}

function EnrollmentWidget(props) {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  // takes course ID, fetches students in course
  useEffect(() => {
    dispatch(getStudents(props.data.id));
  }, [props.data.id, dispatch]);

  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Enrolling Students -
            {" " + props.data.courseName + " " + props.data.courseNumber}
          </h1>
          <div id="card-section">{students.map(createStudentCard)}</div>
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
