import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';

function VerticalNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/');
  };

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: actionType.LOGOUT });
        navigate('/');
      }
    }
  }, [dispatch, navigate, location, user?.token]);

  return (
    <div id="navBar">
      <div className="logo-area"></div>
      <div className="nav-menu">
        <svg
          class="sensei-logo-nav"
          viewBox="0 0 110 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.2197 31.0649L13 62.5H20C24 62.5 27.5 62.5 27.5 62.5C27.6792 62.4271 34.3631 53.0145 41.8545 42.0032C49.346 30.9555 55.547 21.9132 55.6545 21.9132C55.7621 21.9132 62.1782 30.992 69.9563 42.1126L84.0789 62.3485H91.2119H98.3808L96.8036 60.0515C95.9434 58.8118 86.4088 44.7743 75.5839 28.8772C64.7589 13.0166 55.7979 1.52588e-05 55.6545 1.52588e-05C55.5112 1.52588e-05 45.8691 14.0011 34.2197 31.0649Z"
            fill="white"
          />
          <path
            d="M4.7787 74.0172C2.69974 77.1164 0.979218 79.7416 0.979218 79.851C0.979218 79.9603 8.14805 80.0697 16.9299 80.0697H32.8805L44.0639 94.2896C50.2291 102.129 55.3548 108.509 55.4623 108.509C55.5699 108.509 60.6597 102.129 66.7891 94.2896L77.8649 80.1062L93.9231 80.0697C102.741 80.0697 109.945 79.9968 109.945 79.8874C109.945 79.778 108.225 77.1528 106.11 74.0536L102.275 68.4022L87.5429 68.4386H72.8467L64.2442 79.3405C59.5127 85.3566 55.534 90.2059 55.4265 90.1695C55.2831 90.133 51.3044 85.2107 46.5013 79.2311L37.8629 68.4022H23.2026H8.54233L4.7787 74.0172Z"
            fill="white"
          />
        </svg>
        <ul className="nav-list grid">
          <Link to="/Home" className="removeUnderline white">
            <li className="nav-item">
              <i className="icons uil uil-estate"></i>
              Home
            </li>
          </Link>
          <Link to="/Alerts" className="removeUnderline white">
            <li className="nav-item">
              <i class="icons uil uil-meeting-board"></i>
              Bulletin
            </li>
          </Link>
          <li className="nav-item">
            <i className="icons uil uil-chart-pie-alt"></i>
            Polls
          </li>
          <li className="nav-item">
            <i className="icons uil uil-book"></i>
            Grades
          </li>
          <li className="nav-item" onClick={logout}>
            <i className="icons uil uil-signout"></i>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavBar;
