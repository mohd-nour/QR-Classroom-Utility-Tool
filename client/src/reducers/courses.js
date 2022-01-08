import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";

// reducers change state

const reducer = (courses = [], action) => {
  switch (action.type) {
    case "UPDATE":
      return courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...courses, action.payload];
    case DELETE:
      return courses.filter((course) => course._id !== action.payload); //return all courses except course with id = payload id
    default:
      return courses;
  }
};

export default reducer;
