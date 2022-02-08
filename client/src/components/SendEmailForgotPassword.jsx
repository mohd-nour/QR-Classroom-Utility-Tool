import React from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import CompanionX from "./widgets/companionX";
import { useForm } from "react-hook-form";

function SendEmailForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const sendResetLink = (data) => {
    const inputData = JSON.parse(JSON.stringify(data));
    const formData = {
      email: inputData.email,
    };
    dispatch(sendEmail(formData, navigate));
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
            <form onSubmit={handleSubmit(sendResetLink)}>
              <div className="field-wrapper">
                <label>Email: </label>
                <input
                  autoComplete="off"
                  {...register("confirmPass", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                  name="confirmPass"
                  placeholder="ex: abc123@mail.aub.edu"
                  id="confirmPass"
                  className={`login-input ${
                    errors.confirmPass ? "invalid-entry" : null
                  }`}
                />
                {errors.confirmPass && (
                  <p className="alert">{errors.confirmPass.message}</p>
                )}
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
