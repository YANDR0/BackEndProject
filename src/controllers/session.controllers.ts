import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt'; // Ajusta la ruta según tu estructura de archivos

// Almacena los tokens revocados
const revokedTokens: Set<string> = new Set();

class SessionControllers {
    
    // Iniciar sesión
    login(req: Request, res: Response) {
        const { email, password } = req.body;

        User.findOne({ email }).then((user: UserType | undefined) => {
            if (!user) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Usuario no encontrado" });
            }

            // Verificar la contraseña
            bcrypt.compare(password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(HTTP_STATUS_CODES.UNAUTHORIZATION).json({ message: "Contraseña incorrecta" });
                }

                // Generar el token JWT
                const token = generateToken(user);

                // Enviar respuesta al cliente con el token
                res.json({ token });
            }).catch(() => {
                res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
            });
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Crear un usuario nuevo (solo con email, nombre y contraseña)
    signUp(req: Request, res: Response) {
        const { email, name, password } = req.body;

        // Hashear la contraseña
        bcrypt.hash(password, 10).then(hashedPassword => {
            const newUser = new User({ email, name, password: hashedPassword });

            newUser.save().then((user: UserType) => {
                // Generar el token JWT usando el ID del usuario recién creado
                const token = generateToken(user);

                // Enviar respuesta al cliente con el token
                res.status(HTTP_STATUS_CODES.CREATED).json({ token });
            }).catch(() => {
                res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
            });
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Cerrar sesión
    logout(req: Request, res: Response) {
        // Solo respondemos con un mensaje de éxito y pedimos al cliente que elimine el token
        res.status(HTTP_STATUS_CODES.SUCCESS).json({ message: "Sesión cerrada correctamente. Por favor, elimina el token en el cliente." });
    }
}

const sessionController = new SessionControllers();
export default sessionController;
