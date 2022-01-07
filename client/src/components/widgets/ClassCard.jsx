import React from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../actions/courses";
import { Link } from "react-router-dom";

function ClassCard(props) {
  const dispatch = useDispatch();

  return (
    <div className="card-container">
      <Link
        to="/Selection"
        state={{ data: props }}
        className="removeUnderline black"
      >
        <div className="class-card">
          <h3>
            {props.courseName} {props.courseNumber}
          </h3>
          <p>
            {props.startTime} - {props.endTime}
          </p>
          <p>{props.schedule}</p>
          <div></div>
        </div>
      </Link>
      <button
        onClick={() => dispatch(deleteCourse(props.id))}
        className="uil uil-trash delete-icon"
      ></button>
    </div>
  );
}

export default ClassCard;
