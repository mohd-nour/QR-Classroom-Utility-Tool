import React from "react";
import VerticalNavBar from "../widgets/VerticalNavBar";
import { Navigate } from "react-router-dom";
const Poll = () => {
    if (localStorage.getItem("profile") == null) {
        return <Navigate to="/"></Navigate>;
    }
    return (
        <div>
            <VerticalNavBar/>
            <div className="dash-container">
            <div className="polls-panel flex-center">
                <h2>Create a Poll</h2>
                <div className="poll-container">
                    <div>
                    <label>Title</label>
                    <input></input>
                    </div>
                   <div>
                   <label className="answer-options">Answer Options</label>
                    <div>
                    <input></input>
                    </div>
                    <div>
                    <input></input>
                    </div>
                   </div>
                </div>

            </div>
            </div>
        </div>
    );
};

export default Poll;