import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

export function authenticateToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // 401
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // 401
            }

            next(); // Si el token es válido, pasamos al siguiente middleware o ruta
        });
    };
}
