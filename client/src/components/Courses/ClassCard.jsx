import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteCourse,
  setCurrentCourse,
  fetchGradeSheets,
} from '../../actions/courses';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function ClassCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="card-container">
      <button
        onClick={() => {
          dispatch(
            setCurrentCourse({
              courseId: props.id,
              courseName: props.courseName,
              courseNumber: props.courseNumber,
            })
          );
          navigate('/AddClassPage', { replace: true });
        }}
        className="uil uil-ellipsis-h edit-icon"
      ></button>
      <Link
        to="/Selection"
        state={{ data: props }}
        className="removeUnderline black"
      >
        <div
          className="class-card"
          onMouseEnter={() => {
            dispatch(
              setCurrentCourse({
                courseId: props.id,
                courseName: props.courseName,
                courseNumber: props.courseNumber,
              })
            );
            dispatch(fetchGradeSheets(props.id));
          }}
        >
          <h4>
            {props.courseName} {props.courseNumber}
          </h4>
          <p>
            {props.startTime} - {props.endTime}
          </p>
          <p>{props.schedule}</p>
          <div></div>
        </div>
      </Link>
      <button
        onClick={() => {
          swal('Are you sure you would like to delete this course?', {
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
              dispatch(deleteCourse(props.id));
            }
          });
        }}
        className="uil uil-trash delete-icon"
      ></button>
    </div>
  );
}

export default ClassCard;
