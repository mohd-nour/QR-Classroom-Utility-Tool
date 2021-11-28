import React from "react";
import ClassCard from "./ClassCard";
import courses from "../../courses";
import { Link } from "react-router-dom";

function createCard(course) {
  return (
    <Link
      to="/Attendance"
      state={{ data: course.courseName }}
      className="removeUnderline black"
    >
      <ClassCard
        course={course.courseName}
        time={course.time}
        days={course.days}
      />
    </Link>
  );
}

function LowerSectionMainPage(props) {
  return (
    <div>
      <div id="lower-section">
        <h1 className="title">Welcome, Dr. Ali El Hajj</h1>
        <div className="main-panel">
          <h2 className="sub-title">Your classes</h2>
          <button id="addClassButton">Add a class</button>
        </div>
        <div id="card-section">{courses.map(createCard)}</div>
      </div>
    </div>
  );
}

export default LowerSectionMainPage;
