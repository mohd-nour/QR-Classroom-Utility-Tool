import swal from "sweetalert";
import * as api from "../api";


export const createPoll = (classId, options, professorId, title, professorName, courseTitle) => async (dispatch) => {
    try {
      const { data } = await api.createPoll(classId, options, professorId, title, professorName, courseTitle);
      if (data.error === false){
        dispatch({ type: "ADD_POLL", payload: data.result });
        swal("Poll has been created!", { icon: "success" });
      }
    } catch (error) {
      console.log(error);
    }
};

export const fetchPolls = (professorId) => async (dispatch) => {
  try {
      const {data} = await api.fetchPolls(professorId);
      dispatch({ type: "FETCH_ALL_POLLS", payload: data})
  } catch (error) {
      console.log(error);
  }
}