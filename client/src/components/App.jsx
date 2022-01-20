import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SelectionPage from "./SelectionPage";
import GradeReportPage from "./GradeReportPage";
import AttendancePage from "./AttendancePage";
import EnrollmentPage from "./EnrollmentPage.jsx";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AddClassPage from "./AddClassPage";
import SendEmailForgotPassword from "./SendEmailForgotPassword";
import ResetPassword from "./ResetPassword";
import SessionsPage from "./SessionsPage";
import FinalizedAttendancePage from "./FinalizedAttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Selection" element={<SelectionPage />} />
        <Route path="/Gradebook" element={<GradeReportPage />} />
        <Route path="/Attendance/:sessionNumber" element={<AttendancePage />} />
        <Route path="/Enroll" element={<EnrollmentPage />} />
        <Route path="/AddClassPage" element={<AddClassPage />} />
        <Route path="/SessionsPage" element={<SessionsPage />} />
        <Route path="/FinalizeAttendance" element={<FinalizedAttendancePage />} />
        <Route
          path="/SendEmailForgotPassword"
          element={<SendEmailForgotPassword />}
        />
        <Route
          path="/forgotPass/resetPass/:id/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
