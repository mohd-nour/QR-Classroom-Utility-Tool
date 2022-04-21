import express from "express";
import { signin, signup, verifyAccountRegistration, setProfile, getProfile } from "../controllers/users.js";

const router = express.Router();

router.post("/signin/:mode", signin);
router.post("/signup", signup);
router.patch("/verifyAccount/:email/:verificationToken", verifyAccountRegistration);
router.post("/setProfile", setProfile);
router.get("/getProfile/:userId", getProfile);

export default router;
