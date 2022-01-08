import React from "react";
import { useDispatch } from "react-redux";
import { deleteCourse, setCurrentCourse } from "../../actions/courses";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ClassCard(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // edit button must send current course Id to form

  // set a global variable to the current course id

  // onClick, set currentCourseId to props.id

  // when adding a class, clear currentCourseId

  return (
    <div className="card-container">
      <button
        onClick={() => {
          dispatch(setCurrentCourse(props.id));
          navigate("/AddClassPage", { replace: true });
        }}
        className="uil uil-ellipsis-h edit-icon"
      ></button>
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
        onClick={() => {
          dispatch(deleteCourse(props.id));
        }}
        className="uil uil-trash delete-icon"
      ></button>
    </div>
  );
}

export default ClassCard;
