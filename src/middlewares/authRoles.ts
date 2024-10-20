import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

export function authenticateUserRole() {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.role;

        if (userRole !== 0) {
            return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // 401 si el rol no es 0
        }

        next(); // Si el rol es 0, pasamos al siguiente middleware o ruta
    }
}
