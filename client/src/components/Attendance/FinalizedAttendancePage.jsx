import React from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../widgets/Banner";
import FinalizedAttendanceWidget from "../Attendance/FinalizedAttendanceWidget";


function FinalizedAttendancePage() {
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <Banner />
        <FinalizedAttendanceWidget />
      </div>
    </div>
  );
}

export default FinalizedAttendancePage;
