import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import SessionsWidget from "./widgets/SessionsWidget";
import Banner from "./widgets/Banner";
import { useLocation, Navigate } from "react-router-dom";

function SessionsPage() {
  const location = useLocation();
  const { data } = location.state;
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <Banner />
        <SessionsWidget data={data} />
      </div>
    </div>
  );
}

export default SessionsPage;
