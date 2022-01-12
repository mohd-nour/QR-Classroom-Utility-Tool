import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AttendanceWidget from "./widgets/AttendanceWidget";
import QRWidget from "./widgets/QRWidget";
import {useLocation} from 'react-router-dom';

function AttendancePage() {
  const location = useLocation();
  const {data} = location.state;
  console.log(data);
  console.log("Hello from AttendancePage");
  return (
    <div>
      <VerticalNavBar />
      <QRWidget />
      <AttendanceWidget data={data} />
    </div>
  );
}

export default AttendancePage;
