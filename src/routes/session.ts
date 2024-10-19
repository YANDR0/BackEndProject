import { Router } from "express";
import controllers from "../controllers/index";
import { checkParameters } from "../middlewares/checkParameters";
import { emailInUse } from "../middlewares/emailInUse";
import { checkPassword } from "../middlewares/authPassword";

const sessionController = controllers.sessionController;
const router = Router()

/**
 * @swagger
 * /session/login:
 *  post:
 *   tags: [Session]
 *   description: Login with password and email
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.get('/login', checkParameters(['email', 'password']), emailInUse(false), checkPassword(), sessionController.getUser);
// getUser (Login) by email & password (POST for more security)

/**
 * @swagger
 * /session/register:
 *  post:
 *   tags: [Session]
 *   description: Register as a new user
 *   responses: 
 *    200:
 *     description: api successful yei
 */
router.post('/register', checkParameters(['email', 'name', 'password']), emailInUse(true), sessionController.createUser);
// createUser (Register) by name, email & password 

export default router;