import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import EnrollmentWidget from "./widgets/EnrollmentWidget";
import QRWidget from "./widgets/QRWidget";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function EnrollmentPage() {
  const {courseId} = useSelector((state) => state.currentCourse);
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div>
      <VerticalNavBar />
      <QRWidget QRCodeData = {courseId}/>
      <EnrollmentWidget />
    </div>
  );
}

export default EnrollmentPage;
