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
        {props.mode === "GradeReport" && (
          <h3>{props.attendanceRecord}/{props.totalNbOfSessions} sessions attended</h3>
      )}
      </div>
      {(props.mode !== "removeDelete" || props.mode!=="GradeReport") &&
      <button
        onClick={() => {
          dispatch(removeStudent(props.courseId, props.id));
        }}
        className="uil uil-times remove-icon"
      ></button>
      }
    </div>
  );
}

export default StudentCard;
