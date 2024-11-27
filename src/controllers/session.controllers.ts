import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { sendEmail } from "../utils/sendEmail";

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

                // Desestructuración para eliminar la contraseña
                //const { password, ...rest } = { password: user.password, _id: user._id, biography: user.biography, email: user.email, location: user.location, image: user.image, name: user.name, role: user.role, status: user.status }
                const { password, ...rest } = user;
                const userWithoutPassword = { ...rest };

                // Enviar respuesta al cliente con el token y el usuario

                res.status(HTTP_STATUS_CODES.SUCCESS).json({ token, user: userWithoutPassword });
            }).catch(() => {
                res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
            });
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        });
    }

    // Crear un usuario nuevo (solo con email, nombre y contraseña)
    signUp(req: Request, res: Response) {
        const { email, name, password } = req.body;

        // Hashear la contraseña y crear un nuevo usuario
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                const newUser = new User({ email, name, password: hashedPassword });
                return newUser.save(); // Retorna la promesa de save
            })
            .then((user: UserType) => {
                // Generar el token JWT usando el ID del usuario recién creado
                const token = generateToken(user);

                // Desestructuración para eliminar la contraseña
                const { password, ...rest } = { password: user.password, _id: user._id, biography: user.biography, email: user.email, location: user.location, image: user.image, name: user.name, status: user.status }

                // Enviar respuesta al cliente con el token y el usuario
                res.json({ token, user: rest });
                console.log('Ya vamos a empezar')
            })
            .then(() => {
                try{
                    sendEmail(email);
                } catch (err){
                    console.log(err, 'Correo no enviado')
                }
            })
            .catch(() => {
                res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
            });

            console.log('Acabó al parecer')
    }
    
    loginWithGoogle(req: Request, res: Response) {
        const googleUser = req.user as UserType; // Datos obtenidos de Google

        if (!googleUser || !googleUser.email) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: "No se pudo obtener el usuario de Google." });
        }

        // Verificar si el usuario ya existe en la base de datos
        User.findOne({ email: googleUser.email })
            .then((existingUser: UserType | null) => {
                if (existingUser) {
                    // Si el usuario ya existe, genera un token JWT
                    const token = generateToken(existingUser);
                    res.redirect(`${process.env.WEB_URL}?token=${token}`);
                    return;
                }

                // Si el usuario no existe, crear un nuevo registro
                const newUser = new User({
                    name: googleUser.name,
                    email: googleUser.email,
                    role: 1 // Estado predeterminado, ajusta según sea necesario
                });

                return newUser.save()
                    .then((savedUser: UserType) => {
                        // Genera el token JWT para el nuevo usuario
                        const token = generateToken(savedUser);
                        res.redirect(`${process.env.WEB_URL}?token=${token}`);
                    });
            })
            .catch(() => {
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