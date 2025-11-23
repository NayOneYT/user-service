import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { Types } from "mongoose";

interface JwtRequest extends Request {
    _id?: Types.ObjectId;
}

export default async function userActive (req: JwtRequest, res: Response, next: NextFunction) {
    try {
        const userId = req._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Пользователя с таким ID не существует." });
        }
        if (user.status == "inactive") {
            return res.status(409).json({ message: "Ваш аккаунт заблокирован." });
        }
        next();
    }
    catch (error) {
        console.error("Ошибка в userActive:", error);
        return res.status(500).json({ message: "Ошибка сервера при проверке активности пользователя." });
    }
}