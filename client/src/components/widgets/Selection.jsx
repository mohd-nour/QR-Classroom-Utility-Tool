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
          <Link to="/Attendance" state={{ data: data }}>
            <div className="selection">
              <i className="selection-icon uil uil-edit-alt"> </i>{" "}
              <h2> Take attendance </h2>{" "}
            </div>{" "}
          </Link>{" "}
          <Link to="/Gradebook">
            <div className="selection">
              <i className="selection-icon uil uil-book-open"> </i>{" "}
              <h2> Gradebook </h2>{" "}
            </div>{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Selection;
