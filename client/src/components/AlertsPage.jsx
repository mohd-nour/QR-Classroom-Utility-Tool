import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import AlertForm from "./widgets/AlertForm";
import AlertWidget from "./widgets/AlertWidget";

function AlertsPage(props) {
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <AlertForm />
        <AlertWidget />
      </div>
    </div>
  );
}

export default AlertsPage;
