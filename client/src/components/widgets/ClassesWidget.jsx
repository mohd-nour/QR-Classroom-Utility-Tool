import React, { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";

function createCard(course) {
  return (
    <Link
      to="/Selection"
      state={{ data: course.courseName }}
      className="removeUnderline black"
    >
      <ClassCard
        key={course._id}
        courseName={course.courseName}
        courseNumber={course.courseNumber}
        startTime={course.startTime}
        endTime={course.endTime}
        schedule={course.schedule}
      />
    </Link>
  );
}

function ClassesWidget(props) {
  const courses = useSelector((state) => state.courses);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  console.log(courses);

  return (
    <div>
      <div id="lower-section">
        <h1 className="title">
          Welcome, {user == null ? "No account" : user.result.email}
        </h1>
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
