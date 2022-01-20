import React from "react";
import { useDispatch } from "react-redux";
import { removeStudent } from "../../actions/courses";

function StudentCard(props) {
  const dispatch = useDispatch();

  return (
    <div className="card-container">
      <div className="student-card">
        <div className="avatar"></div>
        <h3 className="student-name">{props.name}</h3>
        <h3 className="student-name">{props.id}</h3>
      </div>
      {props.mode != "removeDelete" &&
      <button
        onClick={() => {
          dispatch(removeStudent(props.courseId, props.id));
        }}
        className="uil uil-times remove-icon"
      ></button>
      }
      {props.mode === "AttendanceRecord" && (
        <div className="right-card-section">
          <h3>62/70</h3>
          <h3>Sessions</h3>
          <br />
          <h3>Grade</h3>
          <h3>97%</h3>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
