import { SET_GRADE_SHEET } from "../constants/actionTypes";

const gradeSheetReducer = (sheet = [], action) => {
  switch (action.type) {
    case SET_GRADE_SHEET:
      return action.payload;
    default:
      return sheet;
  }
};

export default gradeSheetReducer;
