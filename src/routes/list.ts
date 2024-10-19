import { Router } from "express";
import controllers from "../controllers/index";

const listController = controllers.listControllers;
const router = Router();

/**
 * @swagger
 * /list:
 *  get:
 *   tags: [List]
 *   description: Get all elements from all lists
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
 */
router.post('', listController.createListElement); 

/**
 * @swagger
 * /list:
 *  delete:
 *   tags: [List]
 *   description: Delete element from the lists
 *   responses: 
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
router.delete('', listController.deleteListElement); 

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
 */
router.put('', listController.updateListElement); 

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
 */
router.post('/user', listController.getUserList); 

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
 */
router.post('/restaurant', listController.getRestaurantList); 

export default router;