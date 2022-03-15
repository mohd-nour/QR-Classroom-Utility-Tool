import React from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import EnrollmentWidget from "./EnrollmentWidget";
import QRWidget from "../widgets/QRWidget";
import { Navigate } from "react-router-dom";
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
