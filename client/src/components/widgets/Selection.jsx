import React from "react";
import { Link, useLocation } from "react-router-dom";

function Selection() {
  const location = useLocation();
  const { data } = location.state;
  return (
    <div>
      <div className="selection-panel">
        <h1 className="title"> Select an Action </h1>{" "}
        <div className="selection-container">
          <Link to="/Enroll" state={{ data: data }}>
            <div className="selection">
              <div className="selection-icon uil uil-user-plus"></div>
              <h2> Enroll Students </h2>
            </div>
          </Link>
          <Link to="/Attendance" state={{ data: data }}>
            <div className="selection">
              <div className="selection-icon uil uil-edit-alt"> </div>
              <h2> Take attendance </h2>
            </div>
          </Link>
          <Link to="/Gradebook">
            <div className="selection">
              <div className="selection-icon uil uil-book-open"> </div>
              <h2> Gradebook </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Selection;
