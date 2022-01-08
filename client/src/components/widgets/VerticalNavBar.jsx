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
    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
      navigate("/");
    };
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [dispatch, navigate, location, user?.token]);

  return (
    <div id="navBar">
      <div className="nav-menu">
        <img
          className="aub-logo"
          src="./assets/Full-AUB-Seal.png"
          alt="AUB Logo"
          width="100"
        />
        <ul className="nav-list grid">
          <Link to="/Home" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-estate"></i>
              Home
            </li>
          </Link>
          <li className="nav-item">
            <i className="uil uil-exclamation-circle"></i>
            Alerts
          </li>
          <li className="nav-item">
            <i className="uil uil-comment-alt"></i>
            Chats
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
