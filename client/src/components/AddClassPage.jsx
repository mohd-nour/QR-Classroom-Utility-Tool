import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import Banner from "./widgets/Banner";
import AddClassComponent from "./widgets/AddClassComponent";


function AddClassPage(props) {
  return (
    <div>
      <VerticalNavBar />
      <div className="dash-container">
        <Banner />
        <AddClassComponent />
      </div>
    </div>
  );
}

export default AddClassPage;
