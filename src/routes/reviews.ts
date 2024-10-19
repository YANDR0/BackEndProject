import { Router } from "express";
import controllers from "../controllers/index";

const reviewsControllers = controllers.reviewsControllers;
const router = Router()

/**
 * @swagger
 * /reviews:
 *  get:
 *   tags: [Reviews]
 *   description: Get all the reviews
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('', reviewsControllers.getAll); // Obtener todas las reseñas

/**
 * @swagger
 * /reviews:
 *  post:
 *   tags: [Reviews]
 *   description: Generate a new review
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.post('', reviewsControllers.createReview); // Crear una nueva reseña

/**
 * @swagger
 * /reviews:
 *  delete:
 *   tags: [Reviews]
 *   description: Delete a existing review
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.delete('', reviewsControllers.deleteReview); // Borrar una reseña

/**
 * @swagger
 * /reviews:
 *  put:
 *   tags: [Reviews]
 *   description: Update an existing review
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.put('', reviewsControllers.updateReview); // Actualizar una reseña existente

/**
 * @swagger
 * /reviews/restaurant:
 *  get:
 *   tags: [Reviews]
 *   description: Get all the reviews from specific restaurant
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/restaurant', reviewsControllers.getRestaurantReviews); // Obtener todas las reseñas de un restaurante

export default router;