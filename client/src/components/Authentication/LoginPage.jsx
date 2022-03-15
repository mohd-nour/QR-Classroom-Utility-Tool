import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { signin } from '../../actions/auth';
import { getCourses } from '../../actions/courses';
import { fetchAlerts } from '../../actions/alerts';
import Sensei from '../widgets/Sensei';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@material-ui/core';
import Google from '../../images/Google.png';

import io from 'socket.io-client';

export const socket = io();

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {}, [submitting]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setSubmitting(true);
    const inputData = JSON.parse(JSON.stringify(data));
    const formData = {
      email: inputData.email,
      password: inputData.password,
    };
    await dispatch(signin(formData, navigate));
    setSubmitting(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'GoogleAUTH', data: { result, token } });
      const uniqueId = result.googleId;
      localStorage.setItem('profile', JSON.stringify({ result }));
      localStorage.setItem('currentUserUniqueId', uniqueId);
      await dispatch(getCourses());
      await dispatch(fetchAlerts(uniqueId));
      navigate('/Home');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google sign in was unsucessful');
  };

  if (localStorage.getItem('profile') != null) {
    return <Navigate to="/Home"></Navigate>;
  }

  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Sign In</h1>
            <h4 id="login-message">Sign In to manage your classes.</h4>
            <GoogleLogin
              clientId="928846196486-ghenpvc40o1ol8cotd2fi78rfvjh5299.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="google-button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img className="google-logo" src={Google} alt="google-logo" />
                  <h4 className="google-signin">Sign In with Google</h4>
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <div className="form-divider">
              <div className="divider"></div>
              <span className="optional-message">or Sign In with Email</span>
              <div className="divider"></div>
            </div>
            <form autoComplete="new-password" onSubmit={handleSubmit(onSubmit)}>
              <div className="field-wrapper">
                <label>Email</label>
                <input
                  autoComplete="off"
                  {...register('email', {
                    required: 'Email is required.',
                  })}
                  name="email"
                  id="email"
                  className={`login-input ${
                    errors.email ? 'invalid-entry' : null
                  }`}
                />
                {errors.email && (
                  <p className="alert">{errors.email.message}</p>
                )}
              </div>
              <div className="field-wrapper">
                <label>Password</label>
                <input
                  autoComplete="off"
                  {...register('password', {
                    required: 'Password is required.',
                  })}
                  type="password"
                  name="password"
                  id="password"
                  className={`login-input ${
                    errors.password ? 'invalid-entry' : null
                  }`}
                />
                {errors.password && (
                  <p className="alert">{errors.password.message}</p>
                )}
              </div>
              <div id="forgotpass-container">
                <a href="/SendEmailForgotPassword">Forgot Password?</a>
              </div>
              <button
                className="form-button"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <CircularProgress className="form-loader" color="inherit" />
                ) : (
                  <h4>Sign In</h4>
                )}
              </button>
            </form>
            <div id="signup-container">
              <a href="/RegisterPage">Not registered? Sign Up</a>
            </div>
          </div>
          <div className="login-image">
            <div className="login-overlay">
              <Sensei />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
