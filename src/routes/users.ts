import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
//import { roles } from "../middlewares/auth";

const router = Router();

// router.get('', usersControllers.getAll);

// updateUser (Edit) by all user data
router.put('/config', usersControllers.updateUser);

// deleteUser (Delete) by email
router.delete('/config', usersControllers.deleteUser);

export default router;