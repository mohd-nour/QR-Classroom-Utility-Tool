import express from "express";
import { createPoll, fetchPollsForProfessor, fetchPollsForStudent } from "../controllers/polls.js";

const router = express.Router();

router.post("/createPoll", createPoll);
router.get("/fetchPollsForProfessor/:professorId", fetchPollsForProfessor);
router.post("/fetchPollsForStudent", fetchPollsForStudent);



export default router;