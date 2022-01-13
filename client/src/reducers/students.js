import { FETCH_STUDENTS, ADD_STUDENT, REMOVE_STUDENT } from "../constants/actionTypes";

// reducers change state

const reducer = (students = [], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.payload;
    case ADD_STUDENT:
      return [...students, action.payload];
    case REMOVE_STUDENT:
      return students.filter((student) => student.instituteId !== action.payload.instituteId);
    default:
      return students;
  }
};

export default reducer;
