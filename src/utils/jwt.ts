import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';
import { Types } from 'mongoose';

export const generateJwt = (_id: Types.ObjectId): string => {
    return jwt.sign(
        _id,
        JWT_SECRET_KEY as string, 
        { expiresIn: "12h" }
    );
};