import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import {getCourses} from "./courses";
import {fetchAlerts} from "./alerts";
import swal from "sweetalert";


export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // register the user
    console.log("reached signup frontend");
    console.log(formData);
    const { data } = await api.signup(formData);
    console.log(data);
    if (data.error) {
      swal(data.message, { icon: "warning" });
    } else {
      navigate("/");
      swal(data.message, { icon: "success" });
    }
  } catch (error) {
    alert(error.message);
  }
};

export const setProfile = (formData) => async (dispatch) => {
  try {
    const {data} = await api.setProfile(formData);
    if (data) {
      console.log(data);
      dispatch({type: "SET_PROFILE", payload: data});
      swal("Your profile has been saved!", {icon: "success"});
    }
    else {
      swal("An error occured while saving your profile!", {icon: "warning"});
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = (userId) => async (dispatch) => {
  try {
    const {data} = await api.getProfile(userId);
    dispatch({type: "GET_PROFILE", payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const clearProfile = () => async (dispatch) => {
  try {
    dispatch({type: "CLEAR_PROFILE"});
  } catch (error) {
    console.log(error);
  }
}

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    if (data.error) {
      swal(data.message, { icon: "warning" });
    } else {
      dispatch({ type: AUTH, data });
      const uniqueId = JSON.parse(localStorage.getItem("profile")).result._id;
      localStorage.setItem("currentUserUniqueId", uniqueId);
      await dispatch(getCourses());
      await dispatch(fetchAlerts(uniqueId));
      navigate("/Home");
    }
  } catch (error) {
    alert(error.message);
  }
};

export const sendEmail = (emailData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.sendEmail(emailData);
    if (data.error){
      swal(data.message, {icon: "warning"});
    }
    else{
      navigate("/");
      swal(data.message, {icon: "success"});
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccount = (email, verficationToken, navigate) => async (dispatch) => {
  try {
    const {data} = await api.verifyAccount(email, verficationToken);
    if (data.error){
      swal(data.message, {icon: "warning"});
    }
  } catch (error) {
    console.log(error);
  }
};
