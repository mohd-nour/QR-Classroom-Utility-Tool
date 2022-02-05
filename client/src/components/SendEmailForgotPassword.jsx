import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import CompanionX from "./widgets/companionX";

function SendEmailForgotPassword() {
  const [email, setEmail] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SendEmail = async (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(sendEmail(email, navigate));
  };
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Forgot password?</h1>
            <h4 id="login-message">
              Enter your email to recieve a password reset link
            </h4>
            <form onSubmit={SendEmail}>
              <div className="field-wrapper">
                <label>Email: </label>
                <input
                  type="email"
                  name="registerConfirmPassword"
                  placeholder="ex: abc123@mail.aub.edu"
                  id="registerConfirmPassword"
                  className="login-input"
                  onChange={(e) => setEmail({ email: e.target.value })}
                />
              </div>
              <br />
              <button className="form-button" type="submit">
                Send reset link
              </button>
            </form>
          </div>
          <div className="forgot-image">
            <div className="login-overlay">
              <CompanionX />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendEmailForgotPassword;
