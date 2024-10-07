import { Router } from "express";
import restaurantsControllers from "../controllers/restaurants.controllers";
//import { roles } from "../middlewares/auth";

const router = Router();

router.get('', restaurantsControllers.getAll);

export default router;