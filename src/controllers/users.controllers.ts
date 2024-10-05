import { Request, Response } from "express";
import User from '../models/user';
import { User as UserType } from "./../types/user"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class UsersControllers {
    getAll(req: Request, res: Response){
        User.find({}).then((response: UserType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }
}

const usuariosController = new UsersControllers();
export default usuariosController;