import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGradeSheets } from '../../actions/courses';
import { useNavigate } from 'react-router-dom';

function GradeSheetWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );
  const gradeSheets = useSelector((state) => state.gradeSheetsReducer);
  //console.log(gradeSheets);
  const createNewSheet = (e) => {
    e.preventDefault();
    swal('Are you sure you would like to create a new grade sheet?', {
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
        navigate('/CreateGradeSheet');
      }
    });
  };

  useEffect(() => {
    dispatch(fetchGradeSheets(courseId));
  }, [dispatch, courseId]);
  return (
    <div>
      <div id="lower-section">
        <h2 className="title">
          {courseName + ' ' + courseNumber} - Grade sheets
        </h2>
        <div className="main-panel">
          <h3 className="sub-title">Your grade sheets</h3>
          <form onSubmit={createNewSheet}>
            <button id="addClassButton" type="submit">
              Create a sheet
            </button>
          </form>
        </div>
        <div className="empty-classes">
          <h3 className="noclass-title">No grade sheets yet!</h3>
          <div className="sheetPNG"></div>
        </div>
      </div>
    </div>
  );
}

export default GradeSheetWidget;
