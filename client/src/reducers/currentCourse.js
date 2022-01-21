import { SET, CLEAR } from "../constants/actionTypes";

// when edit button is clicked, state is set to payload (the course id)

const currentCourseReducer = (currentCourse = null, action) => {
  switch (action.type) {
    case SET:
      console.log(action.payload);
      return action.payload;
    case CLEAR:
      return null;
    default:
      return currentCourse;
  }
};

export default currentCourseReducer;
