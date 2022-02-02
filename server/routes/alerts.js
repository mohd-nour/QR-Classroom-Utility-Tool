import express from "express";
import { addAlert, getAlertsProfessor } from "../controllers/alerts.js";

const router = express.Router();

router.post("/addAlert/:professorId/:courseId", addAlert);
router.get("/getAlerts/:professorId", getAlertsProfessor);



export default router;