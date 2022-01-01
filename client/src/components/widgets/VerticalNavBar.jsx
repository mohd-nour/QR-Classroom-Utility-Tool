import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';

function VerticalNavBar() {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({type: actionType.LOGOUT});
    console.log("hello from logout!");
    navigate('/');

  };

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const token = user?.token;
    console.log("hello from useeffect!");
    if (token){
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location, user?.token]);

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
          <Link to="/MainPage" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-estate"></i>
              Home
            </li>
          </Link>
          <Link to="/" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-exclamation-circle"></i>
              Alerts
            </li>
          </Link>
          <Link to="/RegisterPage" className="removeUnderline white">
            <li className="nav-item">
              <i className="uil uil-comment-alt"></i>
              Chats
            </li>
          </Link>
          <li className="nav-item" onClick={logout}>
              <i className="uil uil-comment-alt"></i>
              Logout
            </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalNavBar;
