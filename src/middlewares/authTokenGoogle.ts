import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

export function authenticateTokenGoogle() {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // El token debería enviarse como: "Bearer <token>"
    
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido' });
            }
    
            req.user = user; // Aquí almacenamos la información descifrada en req.user
            next();
        });
    };
}