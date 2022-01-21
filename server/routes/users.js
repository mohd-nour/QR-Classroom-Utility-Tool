import express from "express";
import { signin, signup, verifyAccountRegistration } from "../controllers/users.js";

const router = express.Router();

router.post("/signin/:mode", signin);
router.post("/signup", signup);
router.patch("/verifyAccount/:email/:verificationToken", verifyAccountRegistration);

export default router;
