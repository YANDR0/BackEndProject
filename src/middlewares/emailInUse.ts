import { Request, Response, NextFunction } from "express";
import userModel from '../models/user';

//Se encarga de saber si el Email está en uso o no (El argumento decide que hacer en caso de que exista)
export  function emailInUse(creating: boolean){
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const email = req.body.email;
        try {
            const results = await userModel.find({email: email});
            if(creating && results.length > 0) return res.sendStatus(400);
            if(!creating && results.length == 0) return res.sendStatus(404);

            if(!creating) req.body.currUser = results[0];
            next();

        } catch(e) {
            console.log('Server error: ', e);
            res.sendStatus(500);
        }
    }
}