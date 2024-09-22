import { Router } from "express";
import UsuariosController from "../controllers/usuarios.controllers";
import { roles } from "../middlewares/auth";

const router = Router();

router.get('', roles(['admin', 'gerente']), UsuariosController.listAll);

export default router;