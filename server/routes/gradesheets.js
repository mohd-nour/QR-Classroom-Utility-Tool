import express from "express";
import {
  getGradeSheets,
  postGradeSheet,
  updateGradeSheet
} from "../controllers/gradesheets.js";

const router = express.Router();

//instead of writing logic in routes file, import from controllers

router.get("/fetchGradeSheets/:courseId", getGradeSheets);
router.post("/postGradeSheet", postGradeSheet);
router.patch("/updateGradeSheet", updateGradeSheet);


export default router;
