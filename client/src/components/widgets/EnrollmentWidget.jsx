import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, addStudent } from "../../actions/courses";

function createStudentCard(student) {
  if (student) {
    return (
      <StudentCard
        key={student._id}
        id={student.instituteId}
        name={student.name}
        mode="Normal"
      />
    );
  }
}

function EnrollmentWidget(props) {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    studentId: "",
  });

  // takes course ID, fetches students in course
  // runs when mounted
  useEffect(() => {
    dispatch(getStudents(props.data.id));
  }, [props.data.id, dispatch]);

  // if state of student Id = id of one of the students in useSelector state, dont add

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentData.studentId !== "") {
      dispatch(addStudent(props.data.id, studentData.studentId));
    } else {
      alert("Student ID field is empty!");
    }
  };

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
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="addStudent-column">
          <h3 id="form-title">Add Student</h3>
          <label>Student ID</label>
          <input
            name="studentId"
            placeholder="ex: 2021XXXXX"
            id="studentId"
            className="addClass-input"
            value={studentData.studentId}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                studentId: e.target.value,
              })
            }
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

export default EnrollmentWidget;
