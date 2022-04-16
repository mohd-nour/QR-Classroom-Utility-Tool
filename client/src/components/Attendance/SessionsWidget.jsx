import React, { useEffect } from 'react';
import SessionCard from '../Attendance/SessionCard';
import { getSessions, addSession } from '../../actions/courses';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

var createSessionCardWrapped = function (courseData) {
  return function createSessionCard(session) {
    //console.log(session.sessionUniqueId);
    return (
      <SessionCard
        sessionNumber={session.sessionNumber}
        key={session._id}
        courseData={courseData}
        finalized={session.finalized}
      />
    );
  };
};

function SessionsWidget(props) {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessions);
  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );

  useEffect(() => {
    dispatch(getSessions(courseId));
  }, [courseId, dispatch]);

  const createNewSession = (e) => {
    e.preventDefault();
    swal('Are you sure you would like to create a session?', {
      buttons: {
        cancel: {
          text: 'Cancel',
          value: false,
          visible: true,
        },
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch(addSession(courseId));
      }
    });
  };

  return (
    <div>
      <div id="lower-section">
        <h2 className="title">{courseName + ' ' + courseNumber} - Sessions</h2>
        <div className="main-panel">
          <h3 className="sub-title">Your sessions</h3>
          <button className="dash-button" onClick={createNewSession}>
            Create Session
          </button>
        </div>
        {!sessions.length ? (
          <div className="empty-alert">
            <h3 className="empty-text">No sessions yet!</h3>
            <div className="sessionPNG"></div>
          </div>
        ) : (
          <div id="card-section">
            {sessions.map(
              createSessionCardWrapped({ courseId, courseName, courseNumber })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionsWidget;
