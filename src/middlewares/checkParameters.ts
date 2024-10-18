import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

//Se encarga de dar a conocer si todos los parámetos necesario existen en la body
export function checkParameters(fields: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        
        for(let i in fields)
            if(!(i in req.body)) 
                return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        next();
    }
}