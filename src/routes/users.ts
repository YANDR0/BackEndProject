import { Router } from "express";
import controllers from "../controllers/index";
import { authenticateToken } from "../middlewares/authToken";
import upload from '../middlewares/upload-s3';

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
 *   description: Update user profile with an image file
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
 *         description: User ID to update
 *        updatedData:
 *         type: object
 *         properties: 
 *          name: 
 *           type: string
 *           description: Name of the user
 *          email: 
 *           type: string
 *           description: User's email address
 *          password:
 *           type: string
 *           description: User's password
 *          role: 
 *           type: number
 *           description: User's role identifier
 *          location:
 *           type: string
 *           description: Location of the user
 *          biography:
 *           type: string
 *           description: User's biography or description
 *          status:
 *           type: number
 *           description: Account status
 *        image:
 *         type: string
 *         format: binary
 *         description: Profile image file for the user
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
router.put('/config', authenticateToken(),  upload.single('file'), usersControllers.updateUser);

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