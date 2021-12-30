import React from "react";
import { Link } from "react-router-dom";

function VerticalNavBar() {
  return (
    <div id="navBar">
      <div className="nav-menu">
        <img
          className="aub-logo"
          src="./assets/Full-AUB-Seal.png"
          alt="AUB Logo"
          width="100"
        />
        <ul className="nav-list grid">
          <Link to="/MainPage" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-estate"></i>
              Home
            </li>
          </Link>
          <Link to="/" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-exclamation-circle"></i>
              Alerts
            </li>
          </Link>
          <Link to="/RegisterPage" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-comment-alt"></i>
              Chats
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavBar;
