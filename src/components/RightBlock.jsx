import React from "react";
import LowerSectionMainPage from "./LowerSectionMainPage";
import Banner from "./Banner";
import LowerSectionAttendancePage from "./LowerSectionAttendancePage";

function RightBlock(props) {
  return (
    <div className="dash-container">
      <Banner />
      {props.page === "Attendance" ? (
        <LowerSectionAttendancePage />
      ) : (
        <LowerSectionMainPage />
      )}
    </div>
  );
}

export default RightBlock;
