import { Router } from "express";
import sessionControllers from "../controllers/session.controllers";
//import { roles } from "../middlewares/auth";

const router = Router();

// getUser (Login) by email & password (POST for more security)
router.post('/login', sessionControllers.getUser);

// createUser (Register) by name, email & password 
router.post('/register', sessionControllers.createUser);

export default router;