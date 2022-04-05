import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { signup } from '../../actions/auth';
import Sensei from '../widgets/Sensei';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onTouched' });

  const password = watch('registerPassword', '');

  const onSubmit = (data) => {
    const inputData = JSON.parse(JSON.stringify(data));
    const formData = {
      name: inputData.name,
      email: inputData.registerEmail,
      password: inputData.registerPassword,
      confirmPassword: inputData.registerConfirmPassword,
    };
    dispatch(signup(formData, navigate));
  };

  if (localStorage.getItem('profile') != null) {
    return <Navigate to="/Home"></Navigate>;
  }
  return (
    <div>
      <div className="main-container">
        <div className="form-container">
          <div className="login-form">
            <h1>Sign Up</h1>
            <h4 id="auth-message">Sign up to get started.</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-container">
                <label htmlFor="email">Name</label>
                <input
                  {...register('name', {
                    required: 'Name is required.',
                  })}
                  type="text"
                  name="name"
                  placeholder="First and last name"
                  id="registername"
                  className={`std-input ${errors.name ? 'invalid-entry' : ''}`}
                />
                {errors.name && <p className="alert">{errors.name.message}</p>}
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  {...register('registerEmail', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  name="registerEmail"
                  placeholder="Mail@website.com"
                  id="registerEmail"
                  className={`std-input ${
                    errors.registerEmail ? 'invalid-entry' : ''
                  }`}
                />
                {errors.registerEmail && (
                  <p className="alert">{errors.registerEmail.message}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  {...register('registerPassword', {
                    required: 'Password is required.',
                    minLength: {
                      value: 8,
                      message: 'Password must have a minimum of 8 characters.',
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[!_@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message:
                        'Password must contain atleast one uppercase, special, and numeric character',
                    },
                  })}
                  type="password"
                  name="registerPassword"
                  placeholder="Min. 8 characters"
                  id="registerPassword"
                  className={`std-input ${
                    errors.registerPassword ? 'invalid-entry' : ''
                  }`}
                />
                {errors.registerPassword && (
                  <p className="alert">{errors.registerPassword.message}</p>
                )}
              </div>
              <div className="input-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  {...register('registerConfirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'The passwords do not match',
                  })}
                  type="password"
                  name="registerConfirmPassword"
                  placeholder="Confirm password"
                  id="registerConfirmPassword"
                  className={`std-input ${
                    errors.registerConfirmPassword ? 'invalid-entry' : ''
                  }`}
                />
                {errors.registerConfirmPassword && (
                  <p className="alert">
                    {errors.registerConfirmPassword.message}
                  </p>
                )}
              </div>
              <div id="alternate-option">
                <a href="/LoginPage">Already a user? Sign in</a>
              </div>
              <button className="form-button" type="submit">
                <h4>Sign Up</h4>
              </button>
              <p className="terms-message">
                By registering, you confirm that you accept our
                <span className="terms-span"> Terms of Use </span> and
                <span className="terms-span"> Privacy Policy</span>.
              </p>
            </form>
          </div>
          <div className="signup-image">
            <div className="login-overlay">
              <Sensei />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
