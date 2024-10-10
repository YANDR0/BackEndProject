import { Router } from "express";
import controllers from "../controllers/index";

const restaurantsController = controllers.restaurantsController;
const router = Router();

router.get('', restaurantsController.getAll); // Obtener todos los restaurantes
router.post('', restaurantsController.createRestaurant); // Crear un nuevo restaurante
router.delete('', restaurantsController.deleteRestaurant); // Borrar un restaurante
router.put('', restaurantsController.updateRestaurant); // Actualizar un restaurante existente
router.post('/info', restaurantsController.getRestaurants); // Obtener la información de un restaurante
router.post('/category', restaurantsController.getRestaurantsByCategory); // Obtener todos los restaurantes de una categoría

export default router;