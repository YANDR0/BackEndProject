import { Router } from "express";
import controllers from "../controllers/index";

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
 *     description: api successful yei
 */
router.get('', usersControllers.getAll);

/**
 * @swagger
 * /user/config:
 *  put:
 *   tags: [User]
 *   description: Update user
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.put('/config', usersControllers.updateUser);

/**
 * @swagger
 * /user/config:
 *  delete:
 *   tags: [User]
 *   description: Delete user
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.delete('/config', usersControllers.deleteUser);

export default router;