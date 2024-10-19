import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { HTTP_STATUS_CODES } from "../types/http-status-codes";


//Se encarga de comparar la contraseña encriptada de la base con la dada 
export  function checkPassword(){
    return async (req: Request, res: Response, next: NextFunction) => {

        const passDataBase = req.body.currUser.password;
        try {
            const password = req.body.parameters.password;
            const comparation = await bcrypt.compare(password, passDataBase)
            if(!comparation) return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
            req.body.parameters._id = req.body.currUser._id;
            next();      
            

        } catch(e) {
            console.log('Server error: ', e);
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }
}