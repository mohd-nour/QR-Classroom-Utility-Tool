import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSessions, getStudents } from "../../actions/courses";

function Selection() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = location.state;

  const {courseId, courseName, courseNumber, courseStudents} = useSelector((state) => state.currentCourse);
  console.log(courseStudents);
  const myObj = {courseId, courseName, courseNumber, courseStudents};
  const currStudents = useSelector((state) => state.students);
  console.log(myObj);
  console.log(currStudents);
  useEffect(() => {
    dispatch(getSessions(courseId));
    dispatch(getStudents(courseId));
  }, [courseId, dispatch]);
  return (
    <div>
      <div className="selection-panel">
        <h1 className="title"> Select an Action </h1>{" "}
        <div className="selection-container">
          <Link to="/Enroll">
            <div className="selection">
              <div className="selection-icon uil uil-user-plus"></div>
              <h2> Enroll Students </h2>
            </div>
          </Link>
          <Link to="/SessionsPage">
            <div className="selection">
              <div className="selection-icon uil uil-edit-alt"> </div>
              <h2> Take attendance </h2>
            </div>
          </Link>
          <Link to="/Gradebook">
            <div className="selection">
              <div className="selection-icon uil uil-book-open"> </div>
              <h2> Gradebook </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Selection;
