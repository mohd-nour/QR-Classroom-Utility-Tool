import React from "react";
import VerticalNavBar from "./widgets/VerticalNavBar";
import { Navigate } from "react-router-dom";
import NewGradeSheetWidget from "./widgets/NewGradeSheetWidget";

const NewGradeSheetPage = () => {
    if (localStorage.getItem("profile") == null) {
        return <Navigate to="/"></Navigate>;
    }
    return (
        <div>
            <VerticalNavBar/>
            <NewGradeSheetWidget />
        </div>
    );
};

export default NewGradeSheetPage;