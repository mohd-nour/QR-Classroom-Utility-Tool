import express from "express";
import {
  getStudents,
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  addStudent,
  removeStudent,
} from "../controllers/courses.js";

const router = express.Router();

//instead of writing logic in routes file, import from controllers
router.get("/:id", getCourses);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/enroll/:id", getStudents);
router.post("/enroll/:id/:studentId", addStudent);
router.post("/enroll/removeStudent/:id/:studentId", removeStudent);

export default router;
