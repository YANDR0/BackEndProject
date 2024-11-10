import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

class GoogleController {
    // Iniciar sesión
    validation(req: Request, res: Response) {
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

                // Desestructuración para eliminar la contraseña
                //const { password, ...rest } = { password: user.password, _id: user._id, biography: user.biography, email: user.email, location: user.location, image: user.image, name: user.name, role: user.role, status: user.status }
                const { password, ...rest } = user;
                const userWithoutPassword = { ...rest };

                // Enviar respuesta al cliente con el token y el usuario
                res.json({ token, user: userWithoutPassword });
            }).catch(() => {
                res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
            });
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        });
    }
}

const googleController = new GoogleController();
export default googleController;