import express from "express";
import {
  getStudents,
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courses.js";

const router = express.Router();

//instead of writing logic in routes file, import from controllers
router.get("/:id", getCourses);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/enroll/:id", getStudents);

export default router;
