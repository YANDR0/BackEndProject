import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

//Se encarga de dar a conocer si todos los parámetos necesario existen en la body
export function checkParameters(fields: string[]){
    return async (req: Request, res: Response, next: NextFunction) => {

        if(!('parameters' in req.body))
            return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        
        for(let i in fields)
            if(!(i in req.body.parameters)) 
                return res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

        next();
    }
}