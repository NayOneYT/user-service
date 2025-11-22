import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user';
import { generateJwt } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
    const {full_name, date_of_birth, email, password, role} = req.body
    if (!full_name || !date_of_birth || !email || !password) {
        return res.status(400).json({ message: "Необходимо заполнить все обязательные поля (email, password, full_name, date_of_birth)." });
    }
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Пользователь с таким email уже существует." });
        }
        const userRole = (role == "admin") ? "admin" : "user"
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            full_name,
            date_of_birth,
            email,
            password: hashedPassword,
            role: userRole
        });
        await newUser.save()
        const token = generateJwt(newUser._id, newUser.role);
        res.status(201).json({ 
            message: "Регистрация прошла успешно.", 
            token,
            ID: newUser._id
        });
    }
    catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
};

export const login = async (req: Request, res: Response) => {
    const {ID, password} = req.body;
    if (!ID || !password) {
        return res.status(400).json({ message: "Необходимо заполнить все обязательные поля (ID, password)." });
    }
    try {
        const user = await UserModel.findById(ID);
        if (!user) {
            return res.status(404).json({ message: "Пользователя с таким ID не существует." });
        }
        const isPassValid = await bcrypt.compare(password, user.password)
        if (!isPassValid) {
            return res.status(401).json({ message: "Неверный пароль." });
        }
        const token = generateJwt(ID, user.role);
        res.status(201).json({
            message: "Авторизация прошла успешно.",
            token
        });
    }
    catch (error) {
        console.error("Ошибка при авторизации:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
};