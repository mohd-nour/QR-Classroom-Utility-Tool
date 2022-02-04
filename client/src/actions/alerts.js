import * as api from "../api";
import { ADD_ALERT, FETCH_ALERTS } from "../constants/actionTypes";
import swal from "sweetalert";

export const fetchAlerts = (professorId) => async (dispatch) => {
    try {
      const { data } = await api.fetchAlerts(professorId);
      dispatch({ type: FETCH_ALERTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};
  
export const addAlert = (professorId, courseId, messageAndTitle) => async (dispatch) => {
    try {
      const { data } = await api.addAlert(professorId, courseId, messageAndTitle);
      dispatch({ type: ADD_ALERT, payload: data });
    } catch (error) {
      console.log(error);
      swal("Alert has not been added!", { icon: "warning" });
    }
};