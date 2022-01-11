import express from 'express';
import { sendEmail } from '../controllers/passwordReset.js';

const router = express.Router();

router.post('/sendEmail', sendEmail);

export default router;

