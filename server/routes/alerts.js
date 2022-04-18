import express from "express";
import { addAlert, getAlertsProfessor, getAlertsStudent } from "../controllers/alerts.js";

const router = express.Router();

router.post("/addAlert/:professorId/:courseId", addAlert);
router.get("/getAlerts/:professorId", getAlertsProfessor);
router.post("/getAlerts/getAlertsStudent", getAlertsStudent);



export default router;