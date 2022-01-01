import express from 'express';
import { getCourses, createCourse } from '../controllers/courses.js';

const router = express.Router();


//instead of writing logic in routes file, import from controllers 
router.get("/", getCourses);
router.post("/", createCourse);

export default router;
