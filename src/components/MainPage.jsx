import React from 'react';
import VerticalNavBar from "./VerticalNavBar";
import RightBlock from "./RightBlock";

function MainPage(props){
    return (
    <div>
        <VerticalNavBar />
        <RightBlock page={props.page} />
    </div>
      );
}

export default MainPage;