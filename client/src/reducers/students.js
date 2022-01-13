import { FETCH_STUDENTS, ADD_STUDENT } from "../constants/actionTypes";

// reducers change state

const reducer = (students = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.payload;
    case ADD_STUDENT:
      return students;
    // return [...students, action.payload];
    default:
      return students;
  }
};

export default reducer;
