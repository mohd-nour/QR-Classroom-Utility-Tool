import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AttendanceWidget from "./widgets/AttendanceWidget";
import QRWidget from "./widgets/QRWidget";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AttendancePage() {
  const location = useLocation();
  const { sessionNumber } = location.state;
  const {courseId} = useSelector((state) => state.currentCourse);
  const QRCodeData = courseId+" "+sessionNumber;
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <QRWidget QRCodeData={QRCodeData} />
      <AttendanceWidget sessionNumber={sessionNumber} />
    </div>
  );
}

export default AttendancePage;
