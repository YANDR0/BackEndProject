import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

const onlyUser: User = {
    name: "Juana",
    rol: "admin"
}

export function roles(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(allowedRoles.includes(onlyUser.rol))
            return next();  
        res.sendStatus(403);
    }
}

