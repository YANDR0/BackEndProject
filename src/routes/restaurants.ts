import { Router } from "express";
import controllers from "../controllers/index";
import { checkParameters } from "../middlewares/checkParameters";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateUserRole } from "../middlewares/authRoles";
import upload from '../middlewares/upload-s3';

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
 *     description: Successful
 *    500:
 *     description: Error in connection
 */
router.get('', restaurantsController.getAll); // Obtener todos los restaurantes

/**
 * @swagger
 * /restaurant:
 *  post:
 *   tags: [Restaurant]
 *   description: Generate a new restaurant with an image file
 *   consumes:
 *    - multipart/form-data
 *   requestBody:
 *    required: true
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       required: 
 *        - name
 *        - file
 *       properties:
 *        name: 
 *         type: string
 *         description: Name of the restaurant
 *        rating: 
 *         type: number
 *         description: Rating of the restaurant
 *        description:
 *         type: string
 *         description: Description of the restaurant
 *        category:
 *         type: array
 *         items:
 *          type: string
 *         description: List of categories for the restaurant
 *        location:
 *         type: string
 *         description: Location of the restaurant
 *        menu:
 *         type: string
 *         description: Menu information of the restaurant
 *        image:
 *         type: string
 *         format: binary
 *         description: Image file for the restaurant
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    500:
 *     description: Error in connection
 */
router.post('', authenticateToken(), authenticateUserRole(), upload.single('file'), restaurantsController.createRestaurant); // Crear un nuevo restaurante

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
router.delete('', authenticateToken(), authenticateUserRole(), restaurantsController.deleteRestaurant); // Borrar un restaurante

/**
 * @swagger
 * /restaurant:
 *  put:
 *   tags: [Restaurant]
 *   description: Update existing restaurant with an image file
 *   consumes:
 *    - multipart/form-data
 *   requestBody:
 *    required: true
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       required: 
 *        - _id
 *       properties:
 *        _id:
 *         type: string
 *         description: Restaurant ID to update
 *        updatedData:
 *         type: object
 *         properties: 
 *          name: 
 *           type: string
 *           description: Name of the restaurant
 *          rating: 
 *           type: number
 *           description: Rating of the restaurant
 *          description:
 *           type: string
 *           description: Description of the restaurant
 *          category:
 *           type: array
 *           items:
 *            type: string
 *           description: List of categories for the restaurant
 *          location:
 *           type: string
 *           description: Location of the restaurant
 *          menu:
 *           type: string
 *           description: Menu information of the restaurant
 *        image:
 *         type: string
 *         format: binary
 *         description: Updated image file for the restaurant
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    404: 
 *     description: Element does not exist in database
 *    500:
 *     description: Error in connection
 */
router.put('', authenticateToken(), authenticateUserRole(), upload.single('file'), restaurantsController.updateRestaurant); // Actualizar un restaurante existente

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
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    404: 
 *     description: Element do not exist in database
 *    500:
 *     description: Error in connection
 */
router.post('/info', authenticateToken(), checkParameters(['_id']), restaurantsController.getRestaurants); // Obtener la información de un restaurante

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
router.post('/category', authenticateToken(), restaurantsController.getRestaurantsByCategory); // Obtener todos los restaurantes de una categoría

export default router;