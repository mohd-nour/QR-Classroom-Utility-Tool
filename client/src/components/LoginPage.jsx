import React from "react";
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Login</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <button className="google-button">
              <img
                className="google-logo"
                src="https://freesvg.org/img/1534129544.png"
                alt="google-logo"
              />
              <h4>Sign in with Google</h4>
            </button>
            <div className="form-divider">
              <div className="divider"></div>
              <span className="optional-message">or Sign in with Email</span>
              <div className="divider"></div>
            </div>
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
            <div id="forgotpass-container">
              <a href="www.google.com">Forgot Password?</a>
            </div>
            <Link to="/MainPage">
            <button className="form-button">
              <h4>Login</h4>
            </button>
            </Link>
            <div id="signup-container">
              <a href="/RegisterPage">Not registered? Sign Up</a>
            </div>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
