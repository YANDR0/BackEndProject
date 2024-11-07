import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import jwt from 'jsonwebtoken';

class UsersControllers {
    // Obtener todos los usuarios
    getAll(req: Request, res: Response) {
        User.find({}).then((response: UserType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Obtener un solo usuario por _id
    getUser(req: Request, res: Response) {
        const { _id } = req.body;
        User.findOne({ _id }).then((user: UserType | undefined) => {
            if (user) {
                res.send(user);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Usuario no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Controlador
    updateUser(req: Request, res: Response) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            res.sendStatus(HTTP_STATUS_CODES.FORBIDDEN);
        }

        try {
            // Decodificar el token para obtener el userId
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
            const _id = decoded.id; // Extraemos el id del token decodificado

            const updatedData = req.body.updatedData || {}; // Datos a actualizar
            const file = req.file as Express.MulterS3.File; // Aseguramos que req.file es de tipo MulterS3.File
            const imageUrl = file ? file.location : null; // URL de la imagen en S3, si se subió

            // Si hay una imagen nueva, la añadimos a los datos actualizados
            if (imageUrl) {
                updatedData.image = imageUrl;
            }

            // Actualizar el usuario en la base de datos
            User.findByIdAndUpdate(_id, updatedData, { new: true })
                .then((updatedUser: UserType | null) => {
                    if (updatedUser) {
                        res.json(updatedUser);
                    } else {
                        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: "Usuario no encontrado" });
                    }
                })
                .catch(() => {
                    res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
                });

        } catch (error) {
            res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // Si el token no es válido
        }
    }


    // Eliminar un usuario por id
    deleteUser(req: Request, res: Response) {
        const { _id } = req.body;
        User.findOneAndDelete({ _id }).then((deletedUser: UserType | null) => {
            if (deletedUser) {
                res.send({ message: "Usuario eliminado correctamente" });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Usuario no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }
}

const usuariosController = new UsersControllers();
export default usuariosController;
