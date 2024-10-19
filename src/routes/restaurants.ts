import { Router } from "express";
import controllers from "../controllers/index";
import { checkParameters } from "../middlewares/checkParameters";

const restaurantsController = controllers.restaurantsController;
const router = Router();

/**
 * @swagger
 * /restaurant:
 *  get:
 *   tags: [Restaurant]
 *   description: Get all the restaurants
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - name
 *       properties:
 *        name: 
 *         type: string
 *        rating: 
 *         type: number
 *        description:
 *         type: string
 *        category:
 *         type: array
 *         items:
 *          type: string
 *        location:
 *         type: string
 *        menu:
 *         type: string
 */
router.get('', restaurantsController.getAll); // Obtener todos los restaurantes

/**
 * @swagger
 * /restaurant:
 *  post:
 *   tags: [Restaurant]
 *   description: Generate a new restaurant
 */
router.post('', restaurantsController.createRestaurant); // Crear un nuevo restaurante

/**
 * @swagger
 * /restaurant:
 *  delete:
 *   tags: [Restaurant]
 *   description: Delete existing restaurant
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
 */
router.delete('', restaurantsController.deleteRestaurant); // Borrar un restaurante

/**
 * @swagger
 * /restaurant:
 *  put:
 *   tags: [Restaurant]
 *   description: Update existing restaurant
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
 *          name: 
 *           type: string
 *          rating: 
 *           type: number
 *          description:
 *           type: string
 *          category:
 *           type: array
 *           items:
 *            type: string
 *          location:
 *           type: string
 *          menu:
 *           type: string
 */
router.put('', restaurantsController.updateRestaurant); // Actualizar un restaurante existente

/**
 * @swagger
 * /restaurant/info:
 *  post:
 *   tags: [Restaurant]
 *   description: Get information from one specific restaurant
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
 */
router.post('/info', checkParameters(['_id']), restaurantsController.getRestaurants); // Obtener la información de un restaurante

/**
 * @swagger
 * /restaurant/category:
 *  post:
 *   tags: [Restaurant]
 *   description: Get all restaurants with the same category
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - category
 *       properties:
 *        category:
 *         type: string
 */
router.post('/category', restaurantsController.getRestaurantsByCategory); // Obtener todos los restaurantes de una categoría

export default router;