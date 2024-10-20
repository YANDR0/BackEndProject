import { Router } from "express";
import controllers from "../controllers/index";
import { authenticateToken } from "../middlewares/authToken";

const categoryController = controllers.categoryControllers;
const router = Router();

/**
 * @swagger
 * /category:
 *  get:
 *   tags: [Category]
 *   description: Get all categorys
 *   responses: 
 *    200:
 *     description: Successful
 *    500:
 *     description: Error in connection
 */
router.get('', categoryController.getAll);

/**
 * @swagger
 * /category:
 *  post:
 *   tags: [Category]
 *   description: Create a new category
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
 *        - type
 *       properties:
 *        category:
 *         type: string
 *        type: 
 *         type: string
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters
 *    500:
 *     description: Error in connection
 */
router.post('', authenticateToken(), categoryController.createCategory);

/**
 * @swagger
 * /category:
 *  delete:
 *   tags: [Category]
 *   description: Delete a category
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
router.delete('', authenticateToken(), categoryController.deleteCategory);

/**
 * @swagger
 * /category:
 *  put:
 *   tags: [Category]
 *   description: Update a category
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
 *          category: 
 *           type: string
 *          type: 
 *           type: string
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
router.put('', authenticateToken(), categoryController.updateCategory)

/**
 * @swagger
 * /category/id:
 *  post:
 *   tags: [Category]
 *   description: Get all categorys with an specific id
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - idList
 *       properties:
 *        idList:
 *         type: array
 *         items:
 *          type: string
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
router.post('/id', authenticateToken(), categoryController.getCategories);

/**
 * @swagger
 * /category/type:
 *  post:
 *   tags: [Category]
 *   description: Get all categorys with an specific type
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - type
 *       properties:
 *        type:
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
router.post('/type', authenticateToken(), categoryController.getCategoriesByType);

export default router;