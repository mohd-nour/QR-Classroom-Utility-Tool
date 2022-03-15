import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, getStudents } from '../../actions/courses';

function Selection() {
  const dispatch = useDispatch();

  const { courseId } = useSelector((state) => state.currentCourse);
  useEffect(() => {
    dispatch(getSessions(courseId));
    dispatch(getStudents(courseId));
  }, [courseId, dispatch]);
  return (
    <div>
      <div className="selection-panel">
        <h2 className="title"> Select an Action </h2>{' '}
        <div className="selection-container">
          <Link to="/Enroll">
            <div className="selection">
              <div className="selection-icon uil uil-user-plus"></div>
              <h3> Enroll Students </h3>
            </div>
          </Link>
          <Link to="/SessionsPage">
            <div className="selection">
              <div className="selection-icon uil uil-edit-alt"> </div>
              <h3> Take Attendance </h3>
            </div>
          </Link>
          <Link to="/Gradebook">
            <div className="selection">
              <div className="selection-icon uil uil-book-open"> </div>
              <h3> Attendance </h3>
            </div>
          </Link>
          <Link to="/GradeSheets">
            <div className="selection">
              <i className="selection-icon uil uil-book"></i>
              <h3> Gradebook </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Selection;
