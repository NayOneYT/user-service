import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

export const generateJwt = (email: string, role: string): string => {
    const payload = {
        email,
        role
    };
    return jwt.sign(
        payload,
        JWT_SECRET_KEY as string, 
        { expiresIn: "1h" }
    );
};