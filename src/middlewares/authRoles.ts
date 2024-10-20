import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

// Middleware para verificar el rol del usuario
export function authenticateUserRole() {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token de los headers

        if (!token) {
            return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // 401 si no hay token
        }

        // Decodificar el token usando la clave secreta
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
            if (err) {
                return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZATION); // 401 si el token no es válido
            }

            // Extraer el rol del token decodificado
            const userRole = decoded.role;

            if (userRole !== 0) {
                return res.sendStatus(HTTP_STATUS_CODES.FORBIDDEN); // 403 si el rol no es adecuado
            }

            next(); // Si el rol es 0, continuar
        });
    }
}
