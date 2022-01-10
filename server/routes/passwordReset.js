const router = express.Router();
import {sendEmail, resetPassword} from "../controllers/passwordReset.js";

router.post("/", sendEmail);

router.post("/:userId/:token", resetPassword);

export default router;