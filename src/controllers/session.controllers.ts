import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "../types/user";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import bcrypt from 'bcrypt';

class SessionControllers {
    
    // Obtener un solo usuario por email y password
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

    // Crear un usuario nuevo (solo con email, username y password)
    async createUser(req: Request, res: Response) {
        const password = await bcrypt.hash(req.body.password, 10);
        const { email, name } = req.body;
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
