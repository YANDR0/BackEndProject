import { Router } from "express";
import controllers from "../controllers/index";

const reviewsControllers = controllers.reviewsControllers;
const router = Router()

router.get('', reviewsControllers.getAll); // Obtener todas las reseñas
router.post('', reviewsControllers.createReview); // Crear una nueva reseña
router.delete('', reviewsControllers.deleteReview); // Borrar una reseña
router.put('', reviewsControllers.updateReview); // Actualizar una reseña existente
router.post('/restaurant', reviewsControllers.getRestaurantReviews); // Obtener todas las reseñas de un restaurante

export default router;