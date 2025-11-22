import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

export const generateJwt = (id: string, role: string): string => {
    const payload = {
        id,
        role
    };
    return jwt.sign(
        payload,
        JWT_SECRET_KEY as string, 
        { expiresIn: "1h" }
    );
};