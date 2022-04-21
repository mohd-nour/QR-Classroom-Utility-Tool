import express from "express";
import { signin, signup, verifyAccountRegistration, setProfile } from "../controllers/users.js";

const router = express.Router();

router.post("/signin/:mode", signin);
router.post("/signup", signup);
router.patch("/verifyAccount/:email/:verificationToken", verifyAccountRegistration);
router.post("/setProfile", setProfile)

export default router;
