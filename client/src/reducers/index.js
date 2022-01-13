import { combineReducers } from "redux";

import courses from "./courses";
import auth from "./auth";
import students from "./students";
import currentCourse from "./currentCourse";

export default combineReducers({
  courses,
  auth,
  currentCourse,
  students
});
