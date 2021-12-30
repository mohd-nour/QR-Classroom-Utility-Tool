import React from "react";
import {Link} from "react-router-dom";

function RegisterPage() {
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Register</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <div className="field-wrapper">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="mail@website.com"
                id="email"
                className="login-input"
              />
            </div>
            <div className="field-wrapper">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="min. 8 characters"
                id="passsord"
                className="login-input"
              />
            </div>
            <div className="field-wrapper">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="min. 8 characters"
                id="confirmPassword"
                className="login-input"
              />
            </div>
            <div id="forgotpass-container">
              <a href="/">Already a user? Sign in</a>
            </div>
            <Link to="/MainPage">
            <button className="form-button">
              <h4>Register</h4>
            </button>
            </Link>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
