import React, {useState} from "react";

function ResetPassword() {
  const register = async (e) => {
   e.preventDefault();
  }
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Reset password</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <form onSubmit={register}>
            <div className="field-wrapper">
              <label for="confirmPassword">New password: </label>
              <input
                type="email"
                name="registerConfirmPassword"
                placeholder="min. 8 characters"
                id="registerConfirmPassword"
                className="login-input"
              />
            </div>
            <div className="field-wrapper">
              <label for="confirmPassword">Confirm password: </label>
              <input
                type="email"
                name="registerConfirmPassword"
                placeholder="min. 8 characters"
                id="registerConfirmPassword"
                className="login-input"
              />
            </div>
            <button className="form-button" type='submit'>
              <h4>Reset password</h4>
            </button>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
