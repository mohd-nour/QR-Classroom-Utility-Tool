import express from 'express';
import { getCourses, createCourse, deleteCourse, updateCourse } from '../controllers/courses.js';

const router = express.Router();


//instead of writing logic in routes file, import from controllers 
router.get("/:id", getCourses);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
