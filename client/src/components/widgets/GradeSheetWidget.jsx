import React from "react";
import { CircularProgress } from "@material-ui/core";


function GradeSheetWidget() {
  const createNewSession = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <div id="lower-section">
        <h1 className="title">
          EECE 503 - Grade sheets
        </h1>
        <div className="main-panel">
          <h2 className="sub-title">Your sessions</h2>
          <form onSubmit={createNewSession}>
            <button id="addClassButton" type="submit">
              Create a grade sheet
            </button>
          </form>
        </div>
        <CircularProgress className="circular-progress" />
      </div>
    </div>
  );
}

export default GradeSheetWidget;
