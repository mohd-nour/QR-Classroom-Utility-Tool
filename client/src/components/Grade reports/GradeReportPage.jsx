import React from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import GradeReport from "../Grade reports/GradeReport";
import { Navigate } from "react-router-dom";

function GradeReportPage() {
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <GradeReport />
    </div>
  );
}

export default GradeReportPage;
