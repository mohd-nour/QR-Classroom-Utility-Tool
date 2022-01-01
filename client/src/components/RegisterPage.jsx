import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signup} from '../actions/auth';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {email: '', password: '', confirmPassword: ''};
  const [formData, setFormData] = useState(initialState);

  const register = async (e) => {
   e.preventDefault();
   dispatch(signup(formData,navigate));
  }
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Register</h1>
            <h4 id="login-message">Welcome to the University Companion App</h4>
            <form onSubmit={register}>
            <div className="field-wrapper">
              <label for="email">Email</label>
              <input
                type="email"
                name="registerEmail"
                placeholder="mail@website.com"
                id="registerEmail"
                className="login-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email:e.target.value})}
              />
            </div>
            <div className="field-wrapper">
              <label for="password">Password</label>
              <input
                type="password"
                name="registerPassword"
                placeholder="min. 8 characters"
                id="registerPassword"
                className="login-input"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password:e.target.value})}
              />
            </div>
            <div className="field-wrapper">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="registerConfirmPassword"
                placeholder="min. 8 characters"
                id="registerConfirmPassword"
                className="login-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}
              />
            </div>
            <div id="forgotpass-container">
              <a href="/">Already a user? Sign in</a>
            </div>
            <button className="form-button" type='submit'>
              <h4>Register</h4>
            </button>
            </form>
          </div>
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
