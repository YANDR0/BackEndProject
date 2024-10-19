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

    // Actualizar un usuario por id
    updateUser(req: Request, res: Response) {
        const { _id, updatedData } = req.body;  // Obtener id del usuario a actualizar
        User.findOneAndUpdate({ _id }, updatedData, { new: true }).then((updatedUser: UserType | undefined) => {
            if (updatedUser) {
                res.send(updatedUser);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Usuario no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
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
