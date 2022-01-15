import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import Dashboard from "./widgets/Dashboard";
import { Navigate } from "react-router-dom";

function Home(props) {
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <Dashboard />
    </div>
  );
}

export default Home;
