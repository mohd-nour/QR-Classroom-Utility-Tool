import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import SessionCard from "./SessionCard";
import { getSessions, addSession } from "../../actions/courses";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

var createSessionCardWrapped = function (courseData) {
  return function createSessionCard(session) {
    return (
      <SessionCard
        sessionNumber={session.sessionNumber}
        key={session.sessionUniqueId}
        courseData={courseData}
      />
    );
  };
};

function SessionsWidget(props) {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessions);
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);

  useEffect(() => {
    dispatch(getSessions(courseId));
  }, [courseId, dispatch]);

  const createNewSession = (e) => {
    e.preventDefault();
    swal("Are you sure you would like to create a session?", {
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
        },
        confirm: {
          text: "Yes",
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
        <h1 className="title">
          {courseName + " " + courseNumber} - Sessions
        </h1>
        <div className="main-panel">
          <h2 className="sub-title">Your sessions</h2>
          <form onSubmit={createNewSession}>
            <button id="addClassButton" type="submit">
              Create a session
            </button>
          </form>
        </div>
        {!sessions.length ? (
          <CircularProgress className="circular-progress" />
        ) : (
          <div id="card-section">
            {sessions.map(createSessionCardWrapped({courseId, courseName, courseNumber}))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionsWidget;
