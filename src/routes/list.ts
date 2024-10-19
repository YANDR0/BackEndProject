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
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('', listController.getAll);

/**
 * @swagger
 * /list:
 *  post:
 *   tags: [List]
 *   description: Generate new element for the lists
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.post('', listController.createListElement); 

/**
 * @swagger
 * /list:
 *  delete:
 *   tags: [List]
 *   description: Delete element from the lists
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.delete('', listController.deleteListElement); 

/**
 * @swagger
 * /list:
 *  put:
 *   tags: [List]
 *   description: Update element from the lists
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.put('', listController.updateListElement); 

/**
 * @swagger
 * /list/user:
 *  get:
 *   tags: [List]
 *   description: Get the list from a specific user
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/user', listController.getUserList); 

/**
 * @swagger
 * /list/restaurant:
 *  get:
 *   tags: [List]
 *   description: Get all data from a restaurant
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/restaurant', listController.getRestaurantList); 

export default router;