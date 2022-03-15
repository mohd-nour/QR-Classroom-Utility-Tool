import React from "react";
import { useDispatch } from "react-redux";
import { removeStudent } from "../../actions/courses";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

function StudentCard(props) {
  const dispatch = useDispatch();
  const percentage = (props.attendanceRecord / props.totalNbOfSessions) * 100;
  return (
    <div className="card-container">
      <div className="student-card">
        <div className="avatar"></div>
        <h3 className="student-name">{props.name}</h3>
        <h3 className="student-id">{props.id}</h3>
      </div>
      {props.mode === "GradeReport" || (
        <button
          onClick={() => {
            dispatch(removeStudent(props.courseId, props.id));
          }}
          className="uil uil-times remove-icon"
        ></button>
      )}
      {props.mode === "GradeReport" && (
        <div className="grade-section">
          <div className="grade-progress">
            <ProgressProvider valueStart={0} valueEnd={percentage}>
              {(value) => (
                <CircularProgressbar
                  value={value}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    // strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 1.5,
                    pathColor: `rgba(255, 95, 31, ${percentage / 100})`,
                    textColor: "#161718",
                    trailColor: "#d6d6d6",
                  })}
                />
              )}
            </ProgressProvider>
          </div>
          <h3>
            {props.attendanceRecord}/{props.totalNbOfSessions}
          </h3>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
