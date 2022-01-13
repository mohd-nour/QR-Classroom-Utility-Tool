import { FETCH_STUDENTS } from "../constants/actionTypes";

// reducers change state

const reducer = (students = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.payload;
    default:
      return students;
  }
};

export default reducer;
