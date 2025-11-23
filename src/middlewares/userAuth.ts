import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
import { Types } from "mongoose";

interface JwtPayload {
    _id: Types.ObjectId;
}

interface JwtRequest extends Request {
    _id?: Types.ObjectId;
}

export default function userAuth(req: JwtRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Нет токена, авторизуйтесь" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Неверный формат заголовка Authorization (должен быть 'Bearer токен')." });
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY as string) as JwtPayload;
        if (!decoded._id) {
            return res.status(401).json({ message: "Неверный токен: отсутствует ID пользователя." });
        }
        req._id = decoded._id;
        next();
    } 
    catch (err) {
        return res.status(401).json({ message: "Неверный или просроченный токен" });
    }
}