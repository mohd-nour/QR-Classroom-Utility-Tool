import React from "react";
import LowerSectionMainPage from "./LowerSectionMainPage";
import Banner from "./Banner";

function MainPageRight(props) {
  return (
    <div className="dash-container">
      <Banner />
      <LowerSectionMainPage />
    </div>
  );
}

export default MainPageRight;
