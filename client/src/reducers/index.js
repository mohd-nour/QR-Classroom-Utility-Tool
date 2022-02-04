import { combineReducers } from "redux";

import courses from "./courses";
import auth from "./auth";
import students from "./students";
import currentCourse from "./currentCourse";
import sessions from "./sessions";
import currentSessionStudents from "./currentSessionStudents";
import currentSession from "./currentSession";
import alertReducer from "./alerts";

export default combineReducers({
  courses,
  auth,
  currentCourse,
  students,
  sessions,
  currentSessionStudents,
  currentSession,
  alertReducer
});
