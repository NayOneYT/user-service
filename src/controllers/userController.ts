import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import { Types } from 'mongoose';

interface JwtRequest extends Request {
    _id?: Types.ObjectId;
    role?: string;
}

export const getUserById = async (req: JwtRequest, res: Response) => {
    try {
        const userId = req.params.id;
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

export const getAllUsers = async (req: JwtRequest, res: Response) => {
    try {
        const currentUserRole = req.role;
        if (currentUserRole != "admin") {
            return res.status(403).json({ message: "Получать всех пользователей могут только админы." });
        }
        const users = await UserModel.find({}, { __v: 0 });
        res.status(201).json(users);
    }
    catch (error) {
        console.error("Ошибка при получении всех пользователей:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
}

export const blockUserById = async (req: JwtRequest, res: Response) => {
    try {
        const userId = req.params.id;
        const currentUserId = req._id;
        const currentUserRole = req.role;
        if (String(currentUserId) != userId && currentUserRole != "admin") {
            return res.status(403).json({ message: "Вам разрешено заблокировать только самого себя." });
        }
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(409).json({ message: "Пользователя с таким ID не существует." });
        }
        if (user.status == "inactive") {
            return res.status(409).json({ message: `Пользователь с ID ${userId} уже заблокирован.` });
        }
        await user.updateOne({ $set: {status: "inactive"} })
        res.status(201).json({ message: `Пользователь с ID ${userId} успешно заблокирован.` });
    }
    catch (error) {
        console.error("Ошибка при блокировке пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
}