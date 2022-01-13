import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, addStudent } from "../../actions/courses";

function createStudentCard(student) {
  return (
    <StudentCard
      key={student._id}
      id={student.instituteId}
      name={student.name}
      mode="Normal"
    />
  );
}

function EnrollmentWidget(props) {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    studentId: null,
  });

  // takes course ID, fetches students in course
  useEffect(() => {
    console.log(props.data.id);
    dispatch(getStudents(props.data.id));
  }, [props.data.id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in UI " + props.data.id + " and " + studentData.studentId);
    if (studentData) {
      dispatch(addStudent(props.data.id, studentData.studentId));
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
