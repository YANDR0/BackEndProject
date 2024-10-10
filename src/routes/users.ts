import { Router } from "express";
import controllers from "../controllers/index";

const usersControllers = controllers.usersController;
const router = Router()

router.get('', usersControllers.getAll); // Obtener todos los usuarios
router.put('/config', usersControllers.updateUser); // updateUser (Edit) by all user data
router.delete('/config', usersControllers.deleteUser); // deleteUser (Delete) by email

export default router;