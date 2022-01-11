import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { sendEmail } from "../actions/auth";

function SendEmailForgotPassword() {
  const [email, setEmail] = useState({email: ''});
  const dispatch = useDispatch();
  const SendEmail = async (e) => {
   e.preventDefault();
   console.log(email);
   dispatch(sendEmail(email));
  }
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Forgot password?</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <form onSubmit={SendEmail}>
            <div className="field-wrapper">
              <label for="confirmPassword">Email: </label><br/>
              <input
                type="email"
                name="registerConfirmPassword"
                placeholder="min. 8 characters"
                id="registerConfirmPassword"
                className="login-input"
                onChange={(e) => setEmail({email: e.target.value})}
              />
            </div>
            <button className="form-button" type='submit'>
              <h4>Send reset password email</h4>
            </button>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default SendEmailForgotPassword;
