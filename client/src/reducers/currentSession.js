import { ADD_STUDENT_TO_SESSION, FETCH_STUDENTS_IN_SESSION  } from "../constants/actionTypes";

// reducers change state

const reducer = (currentSessionStudents = [], action) => {
  switch (action.type) {
    case ADD_STUDENT_TO_SESSION:
      return [...currentSessionStudents, action.payload];
    case FETCH_STUDENTS_IN_SESSION:
      return action.payload;
    default:
      return currentSessionStudents;
  }
};

export default reducer;
