import { FETCH_GRADE_SHEETS, POST_GRADE_SHEET } from "../constants/actionTypes";

const gradeSheetsReducer = (sheets = [], action) => {
  switch (action.type) {
    case FETCH_GRADE_SHEETS:
      return action.payload;
    case POST_GRADE_SHEET:
      return [...sheets, action.payload];
    default:
      return sheets;
  }
};

export default gradeSheetsReducer;
