import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/config"

interface JwtPayload {
    id: string;
    role: string;
}

interface JwtRequest extends Request {
    id?: string;
    role?: string;
}

export default function userAuth(req: JwtRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: "Нет токена, авторизуйтесь" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Неверный формат заголовка Authorization" })
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY as string) as JwtPayload
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    } 
    catch (err) {
        return res.status(401).json({ message: "Неверный или просроченный токен" })
    }
}