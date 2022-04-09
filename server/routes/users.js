import express from "express";
import { setProfilePicture, signin, signup, verifyAccountRegistration } from "../controllers/users.js";

const router = express.Router();

router.post("/signin/:mode", signin);
router.post("/signup", signup);
router.patch("/verifyAccount/:email/:verificationToken", verifyAccountRegistration);
router.post("/setProfilePicture", setProfilePicture);

export default router;
