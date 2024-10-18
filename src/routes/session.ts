import { Router } from "express";
import controllers from "../controllers/index";
import { checkParameters } from "../middlewares/checkParameters";
import { emailInUse } from "../middlewares/emailInUse";
import { checkPassword } from "../middlewares/authPassword";

const sessionController = controllers.sessionController;
const router = Router()

// getUser (Login) by email & password (POST for more security)
router.post('/login', checkParameters(['email', 'password']), emailInUse(false), checkPassword(), sessionController.getUser);

// createUser (Register) by name, email & password 
router.post('/register', checkParameters(['email', 'name', 'password']), emailInUse(true), sessionController.createUser);

export default router;