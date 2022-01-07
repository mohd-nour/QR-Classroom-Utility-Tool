import express from 'express';
import { getCourses, createCourse } from '../controllers/courses.js';
import auth from '../middleware/auth.js';

const router = express.Router();


//instead of writing logic in routes file, import from controllers 
router.get("/:id", getCourses);
router.post("/", createCourse);

export default router;
