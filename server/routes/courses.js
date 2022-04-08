import express from "express";
import {
  getStudents,
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  addStudent,
  removeStudent,
  addSession,
  getSessions,
  addStudentToSession,
  getStudentsFromSession,
  removeSession,
  finalizeSession,
  getSingleSession,
  closeSession,
  getCoursesForStudents,
  getCoursesIds
} from "../controllers/courses.js";

const router = express.Router();

//instead of writing logic in routes file, import from controllers
router.get("/:id", getCourses);
router.post("/getCoursesForStudents", getCoursesForStudents);
router.get("/getCoursesIds/:instituteId", getCoursesIds);

router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);


router.get("/enroll/:id", getStudents);
router.post("/enroll/:id/:studentId", addStudent);
router.post("/enroll/removeStudent/:id/:studentId", removeStudent);

router.patch("/sessions/addSession/:classId", addSession);
router.get("/sessions/getSessions/:classId", getSessions);
router.patch("/sessions/addSession/:classId/:sessionNumber", removeSession);
router.patch("/sessions/finalizeSession/:classId/:sessionNumber", finalizeSession);
router.patch("/sessions/closeSession/:classId/:sessionNumber", closeSession);

router.patch(
  "/sessions/markAttendance/:classId/:sessionNumber",
  addStudentToSession
);
router.get(
  "/sessions/getSessionAttendance/:classId/:sessionNumber",
  getStudentsFromSession
);

router.get(
  "/sessions/getSingleSession/:classId/:sessionNumber",
  getSingleSession
);

export default router;
