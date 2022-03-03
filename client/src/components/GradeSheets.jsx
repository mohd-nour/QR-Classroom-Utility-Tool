import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import { Navigate } from "react-router-dom";
import GradeSheetWidget from "./widgets/GradeSheetWidget";
import Banner from "./widgets/Banner";

const GradeSheets = () => {
    if (localStorage.getItem("profile") == null) {
        return <Navigate to="/"></Navigate>;
    }
    return (
        <div>
            <VerticalNavBar/>
            <div className="dash-container">
                <Banner />
                <GradeSheetWidget />
            </div>
        </div>
    );
};

export default GradeSheets;