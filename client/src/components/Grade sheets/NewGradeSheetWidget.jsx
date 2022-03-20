import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {postGradeSheet} from "../../actions/courses";


function createStudentGrade(student) {
    return (
        <div key={student._id}>
            <h2>{student.name}</h2>
            <input type="number" 
            placeholder="Grade" 
            onChange = {(e) => student.grade = e.target.value}
            required
            />
        </div>
    ); 
}

function NewGradeSheetWidget() {
  const dispatch = useDispatch();
  const {mode} = useParams();
  const {courseId, courseName, courseNumber} = useSelector((state) => state.currentCourse);
  var students = useSelector((state) => state.students.map(({password, email, ...others}) => others));
  const [gradeSheetDescription, setGradeSheetDescription] = useState("");
  const submitGradeSheet = (e) => {
      e.preventDefault();
      students = students.map(({_id, ...others}) => others)
      console.log(students);
      dispatch(postGradeSheet(courseId, gradeSheetDescription, students));
  }
  return (
    <div className="dash-container">
      <h1 className="title">{mode==="New"? "Creating a new grade sheet": "Viewing grade sheet"} for {courseName+" "+courseNumber} </h1>
      <form onSubmit={submitGradeSheet}>
        <div id="lower-section">
            <h2>Grade sheet description: </h2>
            <input 
            type="text" 
            placeholder="Grade sheet description" 
            value={gradeSheetDescription} 
            onChange={(e) => setGradeSheetDescription(e.target.value)} 
            />
            {students.map(createStudentGrade)}
        </div>
        <br></br>
        <button type="submit">Submit grade sheet</button>
      </form>

    </div>
  );
}

export default NewGradeSheetWidget;


/*
<div id="card-section"></div>
*/