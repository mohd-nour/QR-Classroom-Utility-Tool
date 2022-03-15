import React from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import SelectionPanel from "../Selection/SelectionPanel";
import { Navigate } from "react-router-dom";

function SelectionPage(props) {
  if (localStorage.getItem("profile") == null) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div>
      <VerticalNavBar />
      <SelectionPanel />
    </div>
  );
}

export default SelectionPage;
