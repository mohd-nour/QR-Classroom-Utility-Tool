import express from 'express';
import { sendEmail, resetPassword } from '../controllers/passwordReset.js';

const router = express.Router();

router.post('/sendEmail', sendEmail);
router.patch('/resetPass/:id/:token', resetPassword);
export default router;

