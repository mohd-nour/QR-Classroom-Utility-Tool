import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import GradeReportPage from "./GradeReportPage";
import AttendancePage from "./AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Attendance" element={<AttendancePage />} />
        <Route path="/GradeReport" element={<GradeReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
