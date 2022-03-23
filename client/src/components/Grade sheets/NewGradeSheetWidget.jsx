import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { postGradeSheet, updateGradeSheet } from '../../actions/courses';

function createStudentGrade(student) {
  var grade;
  if (this.mode === 'Old') {
    const [temp] = this.gradeSheet;
    const students = temp.students;
    students.forEach((stud) => {
      if (stud.instituteId === student.instituteId) {
        grade = stud.grade;
      }
    });
  }
  student.grade = grade;
  return (
    <div className="student-sheet-card" key={student._id}>
      <div className="student-sheet-profile">
        <div className="sheet-avatar"></div>
        <h3>{student.name}</h3>
      </div>
      <div className="sheet-inputs">
        <h3 className="student-sheet-id">{student.instituteId}</h3>
        <input
          className="sheet-input"
          type="number"
          placeholder="Grade"
          onChange={(e) => (student.grade = e.target.value)}
          defaultValue={this.mode === 'Old' && grade ? grade : null}
          required
        />
        <div className="sheet-absent-checkbox">
          <h6 className="sheet-absent-title">Absent</h6>
          <input type="checkbox"></input>
        </div>
      </div>
    </div>
  );
}

function NewGradeSheetWidget() {
  const dispatch = useDispatch();
  const { mode } = useParams();
  const { state } = useLocation();
  const { courseId, courseName, courseNumber } = useSelector(
    (state) => state.currentCourse
  );
  var students = useSelector((state) =>
    state.students.map(({ password, email, ...others }) => others)
  );
  var gradeSheets = useSelector((state) => state.gradeSheetsReducer);
  var id;
  var gradeSheet;
  if (mode === 'Old') {
    id = state.id;
    gradeSheet = gradeSheets.filter((gradeSheet) => gradeSheet._id === id);
  }
  const [gradeSheetDescription, setGradeSheetDescription] = useState(
    gradeSheet && gradeSheet[0].deliverable
  );

  const navigate = useNavigate();
  
  const submitGradeSheet = (e) => {
    e.preventDefault();
    students = students.map(({ _id, ...others }) => others);
    dispatch(
      postGradeSheet(courseId, gradeSheetDescription, students, navigate)
    );
  };
  const saveGradeSheet = (e) => {
    e.preventDefault();
    const [updatedGradeSheet] = gradeSheet;
    updatedGradeSheet.students = students;
    updatedGradeSheet.deliverable = gradeSheetDescription;
    dispatch(updateGradeSheet(updatedGradeSheet));
  };
  return (
    <div className="dash-container">
      <h1 className="sheet-title">
        {mode === 'New'
          ? 'Creating a new grade sheet for ' + courseName + ' ' + courseNumber
          : 'Viewing grade sheet'}
      </h1>
      <form onSubmit={mode === 'New' ? submitGradeSheet : saveGradeSheet}>
        <div id="lower-section">
          <div className="sheet-description">
            <input
              className="description-input"
              type="text"
              placeholder="Quiz X"
              defaultValue={
                mode === 'Old'
                  ? gradeSheet[0].deliverable
                  : gradeSheetDescription
              }
              onChange={(e) => setGradeSheetDescription(e.target.value)}
            />
          </div>
          <div className="sheet-cards">
            {students.map(createStudentGrade, {
              gradeSheet: gradeSheet,
              mode: mode,
            })}
          </div>
          <div className="sheet-button-section">
            <button className="sheet-button" type="submit">
              {mode === 'New' ? 'Submit' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewGradeSheetWidget;
