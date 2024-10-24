import { Router } from "express";
import controllers from "../controllers/index";
import { authenticateToken } from "../middlewares/authToken";

const usersControllers = controllers.usersController;
const router = Router()

/**
 * @swagger
 * /user:
 *  get:
 *   tags: [User]
 *   description: Get all users
 *   responses: 
 *    200:
 *     description: Successful
 *    500:
 *     description: Error in connection
 */
router.get('', usersControllers.getAll);

/**
 * @swagger
 * /user/config:
 *  put:
 *   tags: [User]
 *   description: Update user
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
 *          email: 
 *           type: string
 *          password:
 *           type: string
 *          role: 
 *           type: number
 *          location:
 *           type: string
 *          biography:
 *           type: string
 *          image: 
 *           type: string
 *          status:
 *           type: numbers
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
router.put('/config', authenticateToken(), usersControllers.updateUser);

/**
 * @swagger
 * /user/config:
 *  delete:
 *   tags: [User]
 *   description: Delete user
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
router.delete('/config',  authenticateToken(), usersControllers.deleteUser);

export default router;