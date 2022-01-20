import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { getCourses, clearCurrentCourse } from "../../actions/courses";

function createCard(course) {
  return (
    <ClassCard
      key={course._id}
      id={course._id}
      courseName={course.courseName}
      courseNumber={course.courseNumber}
      startTime={course.startTime}
      endTime={course.endTime}
      schedule={course.schedule}
      students={course.students}
    />
  );
}

function ClassesWidget(props) {
  // fetch state of courses from store

  const courses = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // runs when mounted
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <div>
      <div id="lower-section">
        <h1 className="title">
          Welcome, {user == null ? "No account" : user.result.name}
        </h1>
        <div className="main-panel">
          <h2 className="sub-title">Your classes</h2>
          <button
            id="addClassButton"
            onClick={() => {
              dispatch(clearCurrentCourse());
              navigate("/AddClassPage", { replace: true });
            }}
          >
            Add a class
          </button>
        </div>
        {!courses.length ? (
          <CircularProgress className="circular-progress" />
        ) : (
          <div id="card-section">{courses.map(createCard)}</div>
        )}
      </div>
    </div>
  );
}

export default ClassesWidget;
