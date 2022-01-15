import React from "react";
import { useDispatch } from "react-redux";
import { getStudentsFromSession, removeSession } from "../../actions/courses";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function SessionCard(props) {
  const dispatch = useDispatch();
  const loadStudentsInSession = () => {
    dispatch(getStudentsFromSession(props.courseData.id, props.sessionNumber));
  };
  /*
  useEffect(() => {
    dispatch(getStudentsFromSession(props.courseData.id,props.sessionNumber));
  }, [dispatch, props.courseData.id, props.sessionNumber]);
  */
  return (
    <div className="card-container">
      <div className="class-card">
        <Link
          to="/Attendance"
          onMouseOver={loadStudentsInSession}
          state={{ data: props.courseData, sessionNumber: props.sessionNumber }}
        >
          <h3>Session {props.sessionNumber}</h3>
        </Link>
        <button
          onClick={() => {
            swal("Are you sure you would like to delete this course?", {
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
                dispatch(
                  removeSession(props.courseData.id, props.sessionNumber)
                );
              }
            });
          }}
          className="uil uil-trash delete-icon"
        ></button>
        <div></div>
      </div>
    </div>
  );
}

export default SessionCard;
