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
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('', restaurantsController.getAll); // Obtener todos los restaurantes

/**
 * @swagger
 * /restaurant:
 *  post:
 *   tags: [Restaurant]
 *   description: Generate a new restaurant
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.post('', restaurantsController.createRestaurant); // Crear un nuevo restaurante

/**
 * @swagger
 * /restaurant:
 *  delete:
 *   tags: [Restaurant]
 *   description: Delete existing restaurant
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.delete('', restaurantsController.deleteRestaurant); // Borrar un restaurante

/**
 * @swagger
 * /restaurant:
 *  put:
 *   tags: [Restaurant]
 *   description: Update existing restaurant
 *   responses: 
 *    200:
 *     description: api successful yei
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
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/info', checkParameters(['_id']), restaurantsController.getRestaurants); // Obtener la información de un restaurante

/**
 * @swagger
 * /restaurant/category:
 *  get:
 *   tags: [Restaurant]
 *   description: Get all restaurants with the same category
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/category', restaurantsController.getRestaurantsByCategory); // Obtener todos los restaurantes de una categoría

export default router;