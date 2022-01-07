import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import SelectionPage from "./SelectionPage";
import GradeReportPage from "./GradeReportPage";
import AttendancePage from "./AttendancePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AddClassPage from "./AddClassPage";
import { getCourses } from "../actions/courses";

import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Selection" element={<SelectionPage />} />
        <Route path="/Gradebook" element={<GradeReportPage />} />
        <Route path="/Attendance" element={<AttendancePage />} />
        <Route path="/AddClassPage" element={<AddClassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
