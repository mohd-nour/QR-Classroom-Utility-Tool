import React from 'react';
import VerticalNavBar from "./subComponents/VerticalNavBar";
import AttendanceRight from "./subComponents/AttendanceRight";

function AttendancePage(props){
    return (
    <div>
        <VerticalNavBar />
        <AttendanceRight/>
    </div>
      );
}

export default AttendancePage;