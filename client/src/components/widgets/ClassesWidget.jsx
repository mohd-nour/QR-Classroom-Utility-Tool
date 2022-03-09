import React, { useEffect, useState, useRef } from 'react';
import ClassCard from './ClassCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, clearCurrentCourse } from '../../actions/courses';
// import { ReactComponent as Svg } from "../../images/undraw-prof.svg";

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

  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const courses = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // runs when mounted
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <div>
      <div id="lower-section">
        <div className="main-panel">
          <h2 className="title">
            Welcome, {user == null ? 'No account' : user.result.name}
          </h2>
          <button
            id="addClassButton"
            onClick={() => {
              dispatch(clearCurrentCourse());
              navigate('/AddClassPage', { replace: true });
            }}
          >
            Add a class
          </button>
        </div>
        <div>
          {!courses.length ? (
            <div></div>
          ) : (
            <h3 className="sub-title">Your classes</h3>
          )}
        </div>
        {!courses.length ? (
          <div className="empty-classes">
            <h3 className="noclass-title">
              No classes yet! Add a class to get started.
            </h3>
            {/* <Svg className="classSVG"></Svg> */}
            <div className="classPNG"></div>
          </div>
        ) : (
          <div id="card-section">{courses.map(createCard)}</div>
        )}
      </div>
      <div ref={endRef}></div>
    </div>
  );
}

export default ClassesWidget;
