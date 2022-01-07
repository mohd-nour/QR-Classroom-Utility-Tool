import { FETCH_ALL, CREATE, DELETE } from '../constants/actionTypes';


const reducer = (courses = [], action) => {
  switch (action.type) {
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
