import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import Banner from "./widgets/Banner";
function AddClassPage(props) {
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <Banner />
      </div>
    </div>
  );
}

export default AddClassPage;
