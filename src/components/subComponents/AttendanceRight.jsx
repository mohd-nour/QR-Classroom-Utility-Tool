import React from "react";
import LowerSectionAttendancePage from "./LowerSectionAttendancePage";
import Banner from "./Banner";

function AttendanceRight(props) {
  return (
    <div className="dash-container">
      <Banner />
      <LowerSectionAttendancePage />
    </div>
  );
}

export default AttendanceRight;
