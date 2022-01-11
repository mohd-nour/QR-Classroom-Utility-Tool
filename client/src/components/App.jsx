import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SelectionPage from "./SelectionPage";
import GradeReportPage from "./GradeReportPage";
import AttendancePage from "./AttendancePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AddClassPage from "./AddClassPage";
import SendEmailForgotPassword from "./SendEmailForgotPassword";

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
        <Route path="/Home" element={<Home />} />
        <Route path="/Selection" element={<SelectionPage />} />
        <Route path="/Gradebook" element={<GradeReportPage />} />
        <Route path="/Attendance" element={<AttendancePage />} />
        <Route path="/AddClassPage" element={<AddClassPage />} />
        <Route path="/SendEmailForgotPassword" element={<SendEmailForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
