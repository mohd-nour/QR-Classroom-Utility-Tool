import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, addStudent } from "../../actions/courses";
import swal from "sweetalert";

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


function EnrollmentWidget(props) {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    studentId: "",
  });

  //setInterval(function () {console.log("Rerendering"); dispatch(getStudents(props.data.id));}, 10000);


  // takes course ID, fetches students in course
  // runs when mounted
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Re rendering enrollment");
      dispatch(getStudents(props.data.id));
    }, 1000);
    return () => clearInterval(interval);
    //dispatch(getStudents(props.data.id));
  }, [props.data.id, dispatch]);

  // if there are no students with an id equal to state, add student

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentData.studentId !== "" && studentData.studentId.length === 9) {
      if (
        students.filter(
          (student) => student.instituteId === studentData.studentId
        ).length === 0
      ) {
        dispatch(addStudent(props.data.id, studentData.studentId));
      } else {
        swal("Student is already enrolled!", { icon: "warning" });
      }
    } else {
      swal("Invalid Entry", { icon: "warning" });
    }
  };

  return (
    <div className="primary-container">
      <div className="dash-container">
        <div id="lower-section">
          <h1 className="title">
            Student Enrolment -
            {" " + props.data.courseName + " " + props.data.courseNumber}
          </h1>
          <div id="card-section">
            {students.map(createStudentCardWrapped(props.data.id))}
          </div>
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
