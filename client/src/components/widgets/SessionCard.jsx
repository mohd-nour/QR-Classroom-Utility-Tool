import React from "react";
import { useDispatch } from "react-redux";
import { getStudentsFromSession, removeSession } from "../../actions/courses";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";


function SessionCard(props) {
  const dispatch = useDispatch();
  const {courseId} = useSelector((state) => state.currentCourse);
  const loadStudentsInSession = () => {
    dispatch(getStudentsFromSession(courseId, props.sessionNumber));
  };
  /*
  useEffect(() => {
    dispatch(getStudentsFromSession(props.courseData.id,props.sessionNumber));
  }, [dispatch, props.courseData.id, props.sessionNumber]);
  */
  return (
    <div className="card-container" onMouseOver={loadStudentsInSession}>
      <div className="class-card">
        <Link
          to="/Attendance"
          state={{ sessionNumber: props.sessionNumber }}
        >
          <div className="session-link">
            <h3>Session {props.sessionNumber}</h3>
          </div>
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
                  removeSession(courseId, props.sessionNumber)
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
