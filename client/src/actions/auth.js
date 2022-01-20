import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import {getCourses} from "./courses";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // register the user
    const { data } = await api.signup(formData);
    console.log(data);
    if (data.error) {
      alert(data.message);
    } else {
      dispatch({ type: AUTH, data });
      const uniqueId = JSON.parse(localStorage.getItem("profile")).result._id;
      localStorage.setItem("currentUserUniqueId", uniqueId);
      await dispatch(getCourses());
      navigate("/Home");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    if (data.error) {
      alert(data.message);
    } else {
      dispatch({ type: AUTH, data });
      const uniqueId = JSON.parse(localStorage.getItem("profile")).result._id;
      localStorage.setItem("currentUserUniqueId", uniqueId);
      await dispatch(getCourses());
      navigate("/Home");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const sendEmail = (emailData) => async (dispatch) => {
  try {
    console.log(emailData);
    await api.sendEmail(emailData);
  } catch (error) {
    console.log(error);
  }
};
