import React from "react";

function AddClassComponent(){
    return (
        <div id="addClassComponent">
            <div className="flex-column">
                <div><h3>Course name: </h3></div>
                <div><h3>Course number: </h3></div>
                <div><h3>Course days: </h3></div>
                <div><h3>Course starts at (time): </h3></div>
                <div><h3>Course ends at (time): </h3></div>
            </div>
            <div class="flex-column">
                <input className="addClass-input"></input>
                <input className="addClass-input"></input>
                <select className="addClass-input">
                    <option value="MWF">MWF</option>
                    <option value="MW">MW</option>
                    <option value="TR">TR</option>
                    <option value="M">M</option>
                    <option value="T">T</option>
                    <option value="W">W</option>
                    <option value="R">R</option>
                    <option value="F">F</option>
                </select>
                <input className="addClass-input"></input>
                <input className="addClass-input"></input>
            </div>
            <div class="flex-column">
                <button className="addClassButton">Add class!</button>
                <button className="addClassButton">Cancel</button>
            </div>
        </div>
    );
}

export default AddClassComponent;