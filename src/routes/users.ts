import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import { roles } from "../middlewares/auth";

const router = Router();

router.get('', usersControllers.getAll);

// getUser (Login) by email & password (POST for more security)
router.post('/login', usersControllers.getUser);

// createUser (Register) by name, email & password 
router.post('/register', usersControllers.createUser);

// updateUser (Edit) by all user data
router.put('/config', usersControllers.updateUser);

// deleteUser (Delete) by email
router.delete('/config', usersControllers.deleteUser);

export default router;