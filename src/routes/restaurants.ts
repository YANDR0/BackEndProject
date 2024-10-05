import { Router } from "express";
import restaurantsControllers from "../controllers/restaurants.controllers";
import { roles } from "../middlewares/auth";

const router = Router();

router.get('', roles(['admin', 'gerente']), restaurantsControllers.getAll);

export default router;