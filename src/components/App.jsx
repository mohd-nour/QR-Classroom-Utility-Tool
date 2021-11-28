import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AttendanceRecordsPage from "./AttendanceRecordsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Attendance" element={<MainPage page="Attendance" />} />
        <Route path="/GradeReport" element={<AttendanceRecordsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
