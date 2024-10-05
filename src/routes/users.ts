import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import { roles } from "../middlewares/auth";

const router = Router();

router.get('', roles(['admin', 'gerente']), usersControllers.getAll);

export default router;