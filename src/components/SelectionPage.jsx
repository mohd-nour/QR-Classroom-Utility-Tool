import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import SelectionPanel from "./widgets/SelectionPanel";

function SelectionPage(props) {
  return (
    <div>
      <VerticalNavBar />
      <SelectionPanel />
    </div>
  );
}

export default SelectionPage;
