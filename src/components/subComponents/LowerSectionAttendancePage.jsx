import React from "react";
import Students from "../../Students";
import StudentCard from "./StudentCard";
import { useLocation } from 'react-router-dom';


function createStudentCard(student){
    return (
        <StudentCard
        name = {student.studentName}
        mode = "Normal"
        />
    );
}

function LowerSectionAttendancePage(props){
    const location = useLocation();
    const { data } = location.state;
    return (
    <div>
      <div id="lower-section">
        <h1 className="title">{data} - Taking Attendance - Session 12</h1>
        <div id="card-section">
        {Students.map(createStudentCard)}
        </div>
      </div>
    </div>
    );
}

export default LowerSectionAttendancePage;