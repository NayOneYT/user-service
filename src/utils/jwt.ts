import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';
import { Types } from 'mongoose';

export const generateJwt = (_id: Types.ObjectId, role: string): string => {
    const payload = {
        _id,
        role
    };
    return jwt.sign(
        payload,
        JWT_SECRET_KEY as string, 
        { expiresIn: "12h" }
    );
};