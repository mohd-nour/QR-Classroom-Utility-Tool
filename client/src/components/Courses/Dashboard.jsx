import React from "react";
import ClassesWidget from "./ClassesWidget";
import Banner from "../widgets/Banner";

function Dashboard(props) {
  return (
    <div className="dash-container">
      <Banner />
      <ClassesWidget />
    </div>
  );
}

export default Dashboard;
