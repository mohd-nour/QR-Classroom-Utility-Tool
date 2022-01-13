import * as api from "../api";
import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export const getCourses = () => async (dispatch) => {
  try {
    const uniqueId = localStorage.getItem("currentUserUniqueId");
    const { data } = await api.fetchCourses(uniqueId);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudents = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStudents(id);
    console.log(data);
    dispatch({ type: "FETCH_STUDENTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCourse = (course, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(course);
    dispatch({ type: CREATE, payload: data });
    navigate("/Home", { replace: true });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.deleteCourse(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = (id, course, navigate) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.updateCourse(id, course);
    dispatch({ type: "UPDATE", payload: data });
    navigate("/Home", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentCourse = (id) => (dispatch) => {
  try {
    dispatch({ type: "SET", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const clearCurrentCourse = () => (dispatch) => {
  dispatch({ type: "CLEAR" });
};
