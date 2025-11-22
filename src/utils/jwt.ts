import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';
import { ObjectId } from 'mongoose';

export const generateJwt = (_id: ObjectId, role: string): string => {
    const payload = {
        _id,
        role
    };
    return jwt.sign(
        payload,
        JWT_SECRET_KEY as string, 
        { expiresIn: "1h" }
    );
};