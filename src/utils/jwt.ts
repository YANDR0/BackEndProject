import jwt from 'jsonwebtoken';
import { User as UserType } from "../types/user";

export const generateToken = (user: UserType) => {
  return jwt.sign(
    { 
        id: user._id,
        email: user.email,
        role: user.role
    }, //payload. la información que quieres almacenar dentro del token.
    process.env.JWT_SECRET as string, //clave secreta que se utiliza para firmar el token. es un valor único que solo el servidor conoce
    { expiresIn: '1h' }
  );
};