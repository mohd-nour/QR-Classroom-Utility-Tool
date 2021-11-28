import React from "react";
import Selection from "./Selection";
// import LowerSectionAttendancePage from "./LowerSectionAttendancePage";
import Banner from "./Banner";

function SelectionPanel(props) {
  return (
    <div className="dash-container">
      <Banner />
      <Selection />
    </div>
  );
}

export default SelectionPanel;
