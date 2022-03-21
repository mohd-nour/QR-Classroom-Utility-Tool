import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {postGradeSheet} from "../../actions/courses";


function createStudentGrade(student) {
    console.log(this);
    var grade;
    if (this.mode==="Old"){
      const [temp] = this.gradeSheet;
      const students = temp.students;
      students.forEach(stud => {
        if (stud.instituteId === student.instituteId){
          grade = stud.grade;
        }
      });
    }
    
    console.log(grade);
    return (
        <div key={student._id}>
            <h2>{student.name}</h2>
            <input type="number" 
            placeholder="Grade" 
            onChange = {(e) => student.grade = e.target.value}
            value = {this.mode === "Old" && grade? grade: null}
            required
            />
        </div>
    ); 
}

function NewGradeSheetWidget() {
  const dispatch = useDispatch();
  const {mode} = useParams();
  const {state} = useLocation();
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);
  var students = useSelector((state) => state.students.map(({password, email, ...others}) => others));
  const [gradeSheetDescription, setGradeSheetDescription] = useState("");
  const submitGradeSheet = (e) => {
      e.preventDefault();
      students = students.map(({_id, ...others}) => others)
      dispatch(postGradeSheet(courseId, gradeSheetDescription, students));
  }
  const saveGradeSheet = (e) => {
    e.preventDefault();
  }
  var gradeSheets = useSelector((state) => state.gradeSheetsReducer);
  var id;
  var gradeSheet;
  if (mode==="Old"){
    id = state.id;
    gradeSheet = gradeSheets.filter((gradeSheet) => gradeSheet._id===id);
  }

  return (
    <div className="dash-container">
      <h1 className="title">{mode==="New"? "Creating a new grade sheet for "+courseName+" "+courseNumber: "Viewing grade sheet"}</h1>
      <form onSubmit={mode==="New"? submitGradeSheet: saveGradeSheet}>
        <div id="lower-section">
            <h2>Grade sheet description: </h2>
            <input 
            type="text" 
            placeholder="Grade sheet description" 
            value={gradeSheetDescription} 
            onChange={(e) => setGradeSheetDescription(e.target.value)} 
            />
            {students.map(createStudentGrade, {gradeSheet: gradeSheet, mode: mode})}
        </div>
        <br></br>
        <button type="submit">{mode==="New"? "Submit grade sheet": "Save grade sheet"}</button>
      </form>

    </div>
  );
}

export default NewGradeSheetWidget;


/*
<div id="card-section"></div>
*/