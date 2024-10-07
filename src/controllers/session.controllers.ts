import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class SessionControllers {
    // Obtener un solo usuario por email y password
    getUser(req: Request, res: Response) {
        const { email, password } = req.body;
        User.findOne({ email, password }).then((user: UserType | undefined) => {
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
        const newUser = new User({ email, name, password });
        newUser.save().then((user: UserType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(user);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }
}

const sessionController = new SessionControllers();
export default sessionController;
