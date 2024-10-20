import { Router } from "express";
import controllers from "../controllers/index";
import { authenticateToken } from "../middlewares/authToken";

const listController = controllers.listControllers;
const router = Router();

/**
 * @swagger
 * /list:
 *  get:
 *   tags: [List]
 *   description: Get all elements from all lists
 *   responses: 
 *    200:
 *     description: Successful
 *    500:
 *     description: Error in connection
 */
router.get('', listController.getAll);

/**
 * @swagger
 * /list:
 *  post:
 *   tags: [List]
 *   description: Generate new element for the lists
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
 *       properties:
 *        userId:
 *         type: string
 *        restaurantId:
 *         type: string
 *        category:
 *         type: string
 *        score: 
 *         type: number
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    500:
 *     description: Error in connection
 */
router.post('', authenticateToken(), listController.createListElement); 

/**
 * @swagger
 * /list:
 *  delete:
 *   tags: [List]
 *   description: Delete element from the lists
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
router.delete('', authenticateToken(), listController.deleteListElement); 

/**
 * @swagger
 * /list:
 *  put:
 *   tags: [List]
 *   description: Update element from the lists
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
 *         required:
 *          - userId
 *          - restaurantId
 *         properties: 
 *          userId: 
 *           type: string
 *          restaurantId: 
 *           type: string
 *          category:
 *           type: string
 *          score: 
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
router.put('', authenticateToken(), listController.updateListElement); 

/**
 * @swagger
 * /list/user:
 *  post:
 *   tags: [List]
 *   description: Get the list from a specific user
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
 *       properties:
 *        userId:
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
router.post('/user', authenticateToken(), listController.getUserList); 

/**
 * @swagger
 * /list/restaurant:
 *  post:
 *   tags: [List]
 *   description: Get all data from a restaurant
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
router.post('/restaurant', authenticateToken(), listController.getRestaurantList); 

export default router;