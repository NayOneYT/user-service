import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { Types } from 'mongoose';

interface JwtRequest extends Request {
    _id?: Types.ObjectId;
    role?: string;
}

export const getUserById = async (req: JwtRequest, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "Необходимо указать ID пользователя." });
    }
    try {
        const currentUserId = req._id;
        const currentUserRole = req.role;
        if (String(currentUserId) != userId && currentUserRole != "admin") {
            return res.status(403).json({ message: "Вам разрешено получить только самого себя." });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(409).json({ message: "Пользователя с таким ID не существует." });
        }
        res.status(201).json({
            _id: user._id,
            full_name: user.full_name,
            date_of_birth: user.date_of_birth,
            email: user.email,
            role: user.role,
            status: user.status
        });
    }
    catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
}