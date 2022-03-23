import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Authentication/LandingPage';
import Home from './Courses/Home';
import SelectionPage from './Selection/SelectionPage';
import GradeReportPage from './Grade reports/GradeReportPage';
import AttendancePage from './Attendance/AttendancePage';
import EnrollmentPage from './Enrollment/EnrollmentPage';
import LoginPage from './Authentication/LoginPage';
import RegisterPage from './Authentication/RegisterPage';
import AddClassPage from './Courses/AddClassPage';
import SendEmailForgotPassword from './Authentication/SendEmailForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import SessionsPage from './Attendance/SessionsPage';
import AlertsPage from './Alerts/AlertsPage';
import GradeSheets from './Grade sheets/GradeSheetsPage';
import FinalizedAttendancePage from './Attendance/FinalizedAttendancePage';
import Verified from './Authentication/Verified';
import NewGradeSheetPage from './Grade sheets/NewGradeSheetPage';
import GradeSheetReportPage from './Grade sheets/GradeSheetReportPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Selection" element={<SelectionPage />} />
        <Route path="/Gradebook" element={<GradeReportPage />} />
        <Route path="/GradeSheets" element={<GradeSheets />} />
        <Route path="/Attendance/:sessionNumber" element={<AttendancePage />} />
        <Route path="/Enroll" element={<EnrollmentPage />} />
        <Route path="/AddClassPage" element={<AddClassPage />} />
        <Route path="/Alerts" element={<AlertsPage />} />
        <Route path="/SessionsPage" element={<SessionsPage />} />
        <Route path="/CreateGradeSheet/:mode" element={<NewGradeSheetPage />} />
        <Route path="/SheetReport" element={<GradeSheetReportPage />} />
        <Route
          path="/FinalizeAttendance"
          element={<FinalizedAttendancePage />}
        />
        <Route
          path="/verifyRegistration/:email/:verificationToken"
          element={<Verified />}
        />
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
