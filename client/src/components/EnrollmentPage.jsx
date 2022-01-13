import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import EnrollmentWidget from "./widgets/EnrollmentWidget";
import QRWidget from "./widgets/QRWidget";
import { useLocation } from "react-router-dom";

function EnrollmentPage() {
  const location = useLocation();
  const { data } = location.state;
  return (
    <div>
      <VerticalNavBar />
      <QRWidget />
      <EnrollmentWidget data={data} />
    </div>
  );
}

export default EnrollmentPage;
