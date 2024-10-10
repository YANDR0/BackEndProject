import { Router } from "express";
import controllers from "../controllers/index";

const sessionController = controllers.sessionController;
const router = Router()

// getUser (Login) by email & password (POST for more security)
router.post('/login', sessionController.getUser);

// createUser (Register) by name, email & password 
router.post('/register', sessionController.createUser);

export default router;