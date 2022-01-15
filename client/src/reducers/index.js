import { combineReducers } from "redux";

import courses from "./courses";
import auth from "./auth";
import students from "./students";
import currentCourse from "./currentCourse";
import sessions from "./sessions";
import currentSessionStudents from "./currentSession";

export default combineReducers({
  courses,
  auth,
  currentCourse,
  students,
  sessions,
  currentSessionStudents,
});
