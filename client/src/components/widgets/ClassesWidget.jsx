import React,{useEffect, useState} from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import {getCourses} from "../../actions/courses";

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
      />
  );
}

function ClassesWidget(props) {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  console.log(courses);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <div>
      <div id="lower-section">
        <h1 className="title">Welcome, {user == null ? "No account" : user.result.name}</h1>
        <div className="main-panel">
          <h2 className="sub-title">Your classes</h2>
          <Link to="/AddClassPage">
            <button id="addClassButton">Add a class</button>
          </Link>
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
