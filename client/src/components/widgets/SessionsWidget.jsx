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

  useEffect(() => {
    dispatch(getSessions(props.data.id));
  }, [props.data.id, dispatch]);

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
        dispatch(addSession(props.data.id));
      }
    });
  };

  return (
    <div>
      <div id="lower-section">
        <h1 className="title">
          {props.data.courseName + " " + props.data.courseNumber} sessions
        </h1>
        <div className="main-panel">
          <h2 className="sub-title">Your sessions</h2>
          <form onSubmit={createNewSession}>
            <button id="addClassButton" type="submit">
              Create a new session
            </button>
          </form>
        </div>
        {!sessions.length ? (
          <CircularProgress className="circular-progress" />
        ) : (
          <div id="card-section">
            {sessions.map(createSessionCardWrapped(props.data))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionsWidget;
