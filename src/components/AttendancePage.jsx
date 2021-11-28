import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AttendanceWidget from "./widgets/AttendanceWidget";
import QRWidget from "./widgets/QRWidget";

function AttendancePage() {
  return (
    <div>
      <VerticalNavBar />
      <QRWidget />
      <AttendanceWidget />
    </div>
  );
}

export default AttendancePage;
