import React,{useState, useEffect} from "react";
import ClassCard from "./ClassCard";
import courses from "../../courses";
import { Link } from "react-router-dom";

function createCard(course) {
  return (
    <Link
      to="/Selection"
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

function ClassesWidget(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <div>
      <div id="lower-section">
        <h1 className="title">Welcome, {user == null? "No account" : user.result.email}</h1>
        <div className="main-panel">
          <h2 className="sub-title">Your classes</h2>
          <Link to="/AddClassPage"><button id="addClassButton">Add a class</button></Link>
        </div>
        <div id="card-section">{courses.map(createCard)}</div>
      </div>
    </div>
  );
}

export default ClassesWidget;
