import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class UsersControllers {
    // Obtener todos los usuarios
    getAll(req: Request, res: Response) {
        User.find({}).then((response: UserType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Obtener un solo usuario por email y password
    getUser(req: Request, res: Response) {
        const { email, password } = req.body;
        User.findOne({ email, password }).then((user: UserType | null) => {
            if (user) {
                res.send(user);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Usuario no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Crear un usuario nuevo (solo con email, username y password)
    createUser(req: Request, res: Response) {
        const { email, name, password } = req.body;
        const newUser = new User({ email, name, password });  // Crear usuario solo con email, name y password
        newUser.save().then((user: UserType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(user);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Actualizar un usuario por email (se actualiza toda la info basada en el email)
    updateUser(req: Request, res: Response) {
        const { email } = req.body;  // Obtener email del usuario a actualizar
        const updateData = req.body; // Toda la info del usuario
        User.findOneAndUpdate({ email }, updateData, { new: true }).then((updatedUser: UserType | null) => {
            if (updatedUser) {
                res.send(updatedUser);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Usuario no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    // Eliminar un usuario por email
    deleteUser(req: Request, res: Response) {
        const { email } = req.body;
        User.findOneAndDelete({ email }).then((deletedUser: UserType | null) => {
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
