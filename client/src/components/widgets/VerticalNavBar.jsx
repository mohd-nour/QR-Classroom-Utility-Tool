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
          className="sensei-logo-nav"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="20.988696pt"
          height="20.485442pt"
          viewBox="0 0 352.988696 352.485442"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.12, written by Peter Selinger 2001-2015
          </metadata>
          <g
            transform="translate(-78.505652,381.000000) scale(0.100000,-0.100000)"
            fill="#fff"
            stroke="none"
          >
            <path
              d="M1665 2930 l-880 -880 178 -177 177 -178 708 708 707 707 705 -705
705 -705 175 175 175 175 -880 880 c-484 484 -882 880 -885 880 -3 0 -401
-396 -885 -880z"
            />
            <path
              d="M2027 1879 c-290 -286 -527 -527 -527 -534 0 -7 79 -88 176 -181
l175 -168 352 352 352 352 353 -352 352 -353 175 175 175 175 -528 528 -528
528 -527 -522z"
            />
            <path
              d="M2382 817 c-94 -95 -172 -177 -172 -182 0 -6 77 -87 170 -180 l170
-170 178 178 177 177 -175 175 -175 175 -173 -173z"
            />
          </g>
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
