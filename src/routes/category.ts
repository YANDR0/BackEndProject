import { Router } from "express";
import controllers from "../controllers/index";

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
 *     description: api successful yei
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
 *   parameters:
 *    - in: body
 *      name: parameters
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
 *     description: api successful yei
 */
router.post('', categoryController.createCategory);

/**
 * @swagger
 * /category:
 *  delete:
 *   tags: [Category]
 *   description: Delete a category
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.delete('', categoryController.deleteCategory);

/**
 * @swagger
 * /category:
 *  put:
 *   tags: [Category]
 *   description: Update a category
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.put('', categoryController.updateCategory)

/**
 * @swagger
 * /category/id:
 *  get:
 *   tags: [Category]
 *   description: Get all categorys with an specific id
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/id', categoryController.getCategories);

/**
 * @swagger
 * /category/type:
 *  get:
 *   tags: [Category]
 *   description: Get all categorys with an specific type
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/type', categoryController.getCategoriesByType);

export default router;