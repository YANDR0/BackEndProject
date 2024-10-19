import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

//Compara los permisos necesarios con los existentes
//Funciona a nivel de bits, como en linux 111, básicamente admin, user y visitante
//(Modificar/borrar cosas ajenas y ver detalles, Modificar cosas propias, Ver cosas en general)
// LUEGO LO PLANTEO BIEN XD
export  function checkPermissions(neededRole: number){
    return async (req: Request, res: Response, next: NextFunction) => {

        const currRole = req.body.parameters.role //Lo más seguro es que se saque del jwt y no de aquí
        if(currRole & neededRole) next();
        res.status(HTTP_STATUS_CODES.FORBIDDEN);
    }
}