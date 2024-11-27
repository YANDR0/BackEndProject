import { Router } from "express";
import controllers from "../controllers/index";
import { checkParameters } from "../middlewares/checkParameters";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateTokenGoogle } from "../middlewares/authTokenGoogle";
import { emailInUse } from "../middlewares/emailInUse";
import { checkPassword } from "../middlewares/authPassword";
import passport, { use } from 'passport';
import jwt from 'jsonwebtoken';
import { User as UserType } from "../types/user";

const sessionController = controllers.sessionController;
const router = Router()

/**
 * @swagger
 * /session/login:
 *  post:
 *   tags: [Session]
 *   description: Login with password and email
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *        password: 
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
router.post('/login', checkParameters(['email', 'password']), emailInUse(false), checkPassword(), sessionController.login);
// getUser (Login) by email & password (POST for more security)

/**
 * @swagger
 * /session/register:
 *  post:
 *   tags: [Session]
 *   description: Register as a new user
 *   consumes:
 *    - application/json
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required: 
 *        - email
 *        - password
 *        - name
 *       properties:
 *        email:
 *         type: string
 *        password: 
 *         type: string
 *        name: 
 *         type: string
 *   responses: 
 *    200:
 *     description: Successful
 *    400:
 *     description: Missing parameters or Email is already in use
 *    500:
 *     description: Error in connection
 */
router.post('/register', checkParameters(['email', 'name', 'password']), emailInUse(true), sessionController.signUp);
// createUser (Register) by name, email & password 

/**
 * @swagger
 * /session/logout:
 *  post:
 *   tags: [Session]
 *   description: Logout the current user
 *   responses: 
 *    200:
 *     description: Successful logout
 *    400:
 *     description: No token provided
 *    500:
 *     description: Error in connection
 */
router.post('/logout', authenticateToken(), sessionController.logout);

router.get('/profile', authenticateTokenGoogle(), (req, res) => {
    const user = req.user; // Información descifrada del token
    console.log("user: ", user); // Verifica qué se imprime aquí
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/verify',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Redirige a un método del controlador para manejar la lógica
        sessionController.loginWithGoogle(req, res);
    }
);


export default router;