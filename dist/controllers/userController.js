"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUserById = exports.getAllUsers = exports.getUserById = void 0;
const user_1 = require("../models/user");
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req._id;
        const currentUserRole = req.role;
        if (String(currentUserId) != userId && currentUserRole != "admin") {
            return res.status(403).json({ message: "Вам разрешено получить только самого себя." });
        }
        const user = await user_1.UserModel.findById(userId);
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
};
exports.getUserById = getUserById;
const getAllUsers = async (req, res) => {
    try {
        const currentUserRole = req.role;
        if (currentUserRole != "admin") {
            return res.status(403).json({ message: "Получать всех пользователей могут только админы." });
        }
        const users = await user_1.UserModel.find({}, { __v: 0 });
        res.status(201).json(users);
    }
    catch (error) {
        console.error("Ошибка при получении всех пользователей:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
};
exports.getAllUsers = getAllUsers;
const blockUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const currentUserId = req._id;
        const currentUserRole = req.role;
        if (String(currentUserId) != userId && currentUserRole != "admin") {
            return res.status(403).json({ message: "Вам разрешено заблокировать только самого себя." });
        }
        const user = await user_1.UserModel.findById(userId);
        if (!user) {
            return res.status(409).json({ message: "Пользователя с таким ID не существует." });
        }
        if (user.status == "inactive") {
            return res.status(409).json({ message: `Пользователь с ID ${userId} уже заблокирован.` });
        }
        await user.updateOne({ $set: { status: "inactive" } });
        res.status(201).json({ message: `Пользователь с ID ${userId} успешно заблокирован.` });
    }
    catch (error) {
        console.error("Ошибка при блокировке пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
};
exports.blockUserById = blockUserById;
