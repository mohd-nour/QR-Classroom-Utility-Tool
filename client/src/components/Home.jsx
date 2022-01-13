import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import Dashboard from "./widgets/Dashboard";

function Home(props) {
    return (
      <div>
        <VerticalNavBar />
        <Dashboard />
      </div>
    );
}

export default Home;
