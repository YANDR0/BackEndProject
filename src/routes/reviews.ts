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
 *     description: Successful
 *    500:
 *     description: Error in connection
 */
router.get('', reviewsControllers.getAll); // Obtener todas las reseñas

/**
 * @swagger
 * /reviews:
 *  post:
 *   tags: [Reviews]
 *   description: Generate a new review
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - userId
 *        - restaurantId
 *        - content
 *        - score
 *       properties:
 *        userId: 
 *         type: string
 *        restaurantId: 
 *         type: string
 *        score:
 *         type: number
 *        content:
 *         type: string
 *        priority:
 *         type: number
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    500:
 *     description: Error in connection
 */
router.post('', reviewsControllers.createReview); // Crear una nueva reseña

/**
 * @swagger
 * /reviews:
 *  delete:
 *   tags: [Reviews]
 *   description: Delete a existing review
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - _id
 *       properties:
 *        _id:
 *         type: string
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    404: 
 *     description: Element do not exist in database
 *    500:
 *     description: Error in connection
 */
router.delete('', reviewsControllers.deleteReview); // Borrar una reseña

/**
 * @swagger
 * /reviews:
 *  put:
 *   tags: [Reviews]
 *   description: Update an existing review
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - _id
 *       properties:
 *        _id:
 *         type: string
 *        updatedData:
 *         type: object
 *         properties: 
 *          userId: 
 *           type: string
 *          restaurantId: 
 *           type: string
 *          score:
 *           type: number
 *          content:
 *           type: string
 *          priority:
 *           type: number
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    404: 
 *     description: Element do not exist in database
 *    500:
 *     description: Error in connection
 */
router.put('', reviewsControllers.updateReview); // Actualizar una reseña existente

/**
 * @swagger
 * /reviews/restaurant:
 *  post:
 *   tags: [Reviews]
 *   description: Get all the reviews from specific restaurant
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - restaurantId
 *       properties:
 *        restaurantId:
 *         type: string
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    404: 
 *     description: Element do not exist in database
 *    500:
 *     description: Error in connection
 */
router.post('/restaurant', reviewsControllers.getRestaurantReviews); // Obtener todas las reseñas de un restaurante

export default router;