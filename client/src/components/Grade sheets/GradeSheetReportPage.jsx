import React from 'react';
import VerticalNavBar from '../widgets/VerticalNavBar';
import { Navigate } from 'react-router-dom';
import GradeSheetWidget from './GradeSheetWidget';
import Banner from '../widgets/Banner';

const GradeReport = () => {
  if (localStorage.getItem('profile') == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <div className="report-panel">
          <div className="report-left"></div>
          <div className="report-right"></div>
        </div>
      </div>
    </div>
  );
};

export default GradeReport;
