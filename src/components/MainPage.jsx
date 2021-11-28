import React from 'react';
import VerticalNavBar from "./subComponents/VerticalNavBar";
import MainPageRight from "./subComponents/MainPageRight";

function MainPage(props){
    return (
    <div>
        <VerticalNavBar />
        <MainPageRight />
    </div>
      );
}

export default MainPage;