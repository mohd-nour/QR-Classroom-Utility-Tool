import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGradeSheets } from '../../actions/courses';
import { useNavigate } from 'react-router-dom';
import GradeSheetCard from './GradeSheetCard';

<<<<<<< HEAD
function createGradeSheetCard(gradeSheet){
  return <GradeSheetCard key={gradeSheet._id} customId={gradeSheet._id} cardName={gradeSheet.deliverable}/>
=======
function createGradeSheetCard(gradeSheet) {
  return <GradeSheetCard cardName={gradeSheet.deliverable} />;
>>>>>>> 35d21d674897b06829615545ecd017ade36c20b4
}

function GradeSheetWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );
  const gradeSheets = useSelector((state) => state.gradeSheetsReducer);
  console.log(gradeSheets);
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
        navigate('/CreateGradeSheet/New');
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
<<<<<<< HEAD
          {gradeSheets.length!==0? 
            <div id="card-section">{gradeSheets.map(createGradeSheetCard)}</div>
            :
            <div className="empty-classes">
              <h3 className="noclass-title">No grade sheets yet!</h3>
              <div className="sheetPNG"></div>
            </div>
          }
=======
        {gradeSheets.length !== 0 ? (
          <div id="card-section">{gradeSheets.map(createGradeSheetCard)}</div>
        ) : (
          <div className="empty-classes">
            <h3 className="noclass-title">No grade sheets yet!</h3>
            <div className="sheetPNG"></div>
          </div>
        )}
>>>>>>> 35d21d674897b06829615545ecd017ade36c20b4
      </div>
    </div>
  );
}

export default GradeSheetWidget;