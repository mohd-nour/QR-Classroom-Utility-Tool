import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordClient } from "../actions/forgotPass";

function ResetPassword() {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState({
    newPass: "",
    confirmNewPass: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    dispatch(resetPasswordClient(newPassword, id, token, navigate));
  };
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Reset password</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <form onSubmit={register}>
              <div className="field-wrapper">
                <label htmlFor="resettedPassword">New password: </label>
                <input
                  type="password"
                  name="resettedPassword"
                  placeholder="min. 8 characters"
                  className="login-input"
                  onChange={(e) =>
                    setNewPassword({ ...newPassword, newPass: e.target.value })
                  }
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="confirmResettedPassword">
                  Confirm password:{" "}
                </label>
                <input
                  type="password"
                  name="confirmResettedPassword"
                  placeholder="min. 8 characters"
                  className="login-input"
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      confirmNewPass: e.target.value,
                    })
                  }
                />
              </div>
              <button className="form-button" type="submit">
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

export default ResetPassword;
