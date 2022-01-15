import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AttendanceWidget from "./widgets/AttendanceWidget";
import QRWidget from "./widgets/QRWidget";
import { useLocation, Navigate } from "react-router-dom";

function AttendancePage() {
  const location = useLocation();
  const { data, sessionNumber, Students } = location.state;
  if (localStorage.getItem('profile') == null){
    return(<Navigate to = "/"></Navigate>);
  }
  return (
    <div>
      <VerticalNavBar />
      <QRWidget />
      <AttendanceWidget data={data} sessionNumber = {sessionNumber} />
    </div>
  );
}

export default AttendancePage;
