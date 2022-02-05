import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signin } from "../actions/auth";
import { getCourses } from "../actions/courses";
import { fetchAlerts } from "../actions/alerts";
import CompanionX from "./widgets/companionX";
import { useForm } from "react-hook-form";

import io from "socket.io-client";

export const socket = io();

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   login();
  // };

  // const login = async (e) => {
  //   e.preventDefault();
  //   dispatch(signin(formData, navigate));
  // };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "GoogleAUTH", data: { result, token } });
      const uniqueId = result.googleId;
      localStorage.setItem("profile", JSON.stringify({ result }));
      localStorage.setItem("currentUserUniqueId", uniqueId);
      await dispatch(getCourses());
      await dispatch(fetchAlerts(uniqueId));
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google sign in was unsucessful");
  };

  if (localStorage.getItem("profile") != null) {
    return <Navigate to="/Home"></Navigate>;
  }

  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Login</h1>
            <h4 id="login-message">Sign in to manage your classes.</h4>
            <GoogleLogin
              clientId="928846196486-ghenpvc40o1ol8cotd2fi78rfvjh5299.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="google-button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className="google-logo"
                    src="https://freesvg.org/img/1534129544.png"
                    alt="google-logo"
                  />
                  <h4 className="google-signin">Sign in with Google</h4>
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <div className="form-divider">
              <div className="divider"></div>
              <span className="optional-message">or Sign in with Email</span>
              <div className="divider"></div>
            </div>
            <form autoComplete="new-password" onSubmit={handleSubmit(onSubmit)}>
              <div className="field-wrapper">
                <label>Email</label>
                <input
                  autoComplete="off"
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  type="email"
                  name="email"
                  id="email"
                  className={`login-input ${
                    errors.email ? "invalid-entry" : null
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="alert">{errors.email.message}</p>
                )}
              </div>
              <div className="field-wrapper">
                <label>Password</label>
                <input
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  type="password"
                  name="password"
                  id="password"
                  className={`login-input ${
                    errors.password ? "invalid-entry" : null
                  }`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="alert">{errors.password.message}</p>
                )}
              </div>
              <div id="forgotpass-container">
                <a href="/SendEmailForgotPassword">Forgot Password?</a>
              </div>
              <button className="form-button" type="submit">
                <h4>Login</h4>
              </button>
            </form>
            <div id="signup-container">
              <a href="/RegisterPage">Not registered? Sign Up</a>
            </div>
          </div>
          <div className="login-image">
            <div className="login-overlay">
              <CompanionX />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
