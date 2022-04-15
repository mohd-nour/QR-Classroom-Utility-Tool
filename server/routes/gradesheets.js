import express from "express";
import {
  getGradeSheets,
  getStudentGrades,
  postGradeSheet,
  updateGradeSheet
} from "../controllers/gradesheets.js";

const router = express.Router();

//instead of writing logic in routes file, import from controllers

router.get("/fetchGradeSheets/:courseId", getGradeSheets);
router.post("/postGradeSheet", postGradeSheet);
router.patch("/updateGradeSheet", updateGradeSheet);
router.get("/getStudentGrades/:instituteId", getStudentGrades);


export default router;
