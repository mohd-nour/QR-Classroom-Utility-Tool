import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { fetchGradeSheets } from "../../actions/courses";
import { useNavigate } from "react-router-dom";



function GradeSheetWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);
  const gradeSheets = useSelector((state) => state.gradeSheetsReducer);
  //console.log(gradeSheets);
  const createNewSheet = (e) => {
    e.preventDefault();
    swal("Are you sure you would like to create a new grade sheet?", {
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
        navigate("/CreateGradeSheet");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchGradeSheets(courseId));
  }, [dispatch, courseId]);
  return (
    <div>
      <div id="lower-section">
        <h1 className="title">
        {courseName + " " + courseNumber} - Grade sheets
        </h1>
        <div className="main-panel">
          <h2 className="sub-title">Your sessions</h2>
          <form onSubmit={createNewSheet}>
            <button id="addClassButton" type="submit">
              Create a grade sheet
            </button>
          </form>
        </div>
        <CircularProgress className="circular-progress" />
      </div>
    </div>
  );
}

export default GradeSheetWidget;
