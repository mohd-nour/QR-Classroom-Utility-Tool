import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

function VerticalNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: actionType.LOGOUT });
        navigate("/");
      }
    }
  }, [dispatch, navigate, location, user?.token]);

  return (
    <div id="navBar">
      <div className="logo-area"></div>
      <div className="nav-menu">
        <svg
          className="companionX-logo-nav"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="174.000000pt"
          height="199.768783pt"
          viewBox="0 0 174.000000 199.768783"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.12, written by Peter Selinger 2001-2015
          </metadata>
          <g
            transform="translate(-34.500000,215.884391) scale(0.100000,-0.100000)"
            fill="#fff"
            stroke="none"
          >
            <path
              d="M779 1911 l-434 -248 0 -503 0 -503 434 -248 434 -248 36 19 c20 10
216 122 436 248 l400 229 0 503 0 503 -400 229 c-220 126 -416 238 -436 248
l-36 19 -434 -248z m773 -136 c153 -86 276 -161 273 -165 -7 -11 -144 -90
-156 -90 -5 0 -104 54 -220 121 -116 66 -217 123 -225 126 -7 3 -112 -52 -234
-121 -121 -69 -225 -126 -232 -125 -22 1 -151 83 -148 94 2 6 138 87 304 182
l301 171 30 -18 c17 -9 155 -88 307 -175z m-422 -407 l-1 -163 -145 -81 -144
-82 2 165 3 165 135 79 c74 43 138 78 143 78 4 1 7 -72 7 -161z m320 83 l135
-79 3 -165 2 -165 -144 82 -145 81 -1 163 c0 89 3 162 8 161 4 0 68 -35 142
-78z m-850 -34 l75 -43 5 -263 5 -263 222 -127 222 -126 1 -99 0 -98 -22 14
c-13 8 -152 88 -310 178 l-288 164 0 353 c0 194 3 353 8 353 4 -1 41 -20 82
-43z m1320 -310 l0 -353 -287 -164 c-159 -90 -298 -170 -310 -178 l-23 -14 0
98 1 99 222 126 222 127 5 263 5 263 75 43 c41 23 78 42 83 43 4 0 7 -159 7
-353z m-430 -207 c0 -6 -265 -160 -275 -160 -10 0 -275 154 -275 160 0 3 62
42 138 86 l137 79 138 -79 c75 -44 137 -83 137 -86z"
            />
          </g>
        </svg>
        <ul className="nav-list grid">
          <Link to="/Home" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-estate"></i>
              Home
            </li>
          </Link>
          <Link to="/Alerts" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-comments-alt"></i>
              Forum
            </li>
          </Link>
          <li className="nav-item">
            <i className="uil uil-chart-pie-alt"></i>
            Polls
          </li>
          <li className="nav-item">
            <i className="uil uil-book"></i>
            Grades
          </li>
          <li className="nav-item" onClick={logout}>
            <i className="uil uil-signout"></i>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavBar;
