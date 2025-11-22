"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    const { full_name, date_of_birth, email, password, role } = req.body;
    if (!full_name || !date_of_birth || !email || !password) {
        return res.status(400).json({ message: "Необходимо заполнить все обязательные поля (email, password, full_name, date_of_birth)." });
    }
    try {
        const existingUser = await user_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Пользователь с таким email уже существует." });
        }
        const userRole = (role == "admin") ? "admin" : "user";
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({
            full_name,
            date_of_birth,
            email,
            password: hashedPassword,
            role: userRole
        });
        await newUser.save();
        const token = (0, jwt_1.generateJwt)(newUser._id, newUser.role);
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
exports.register = register;
const login = async (req, res) => {
    const { ID, password } = req.body;
    if (!ID || !password) {
        return res.status(400).json({ message: "Необходимо заполнить все обязательные поля (ID, password)." });
    }
    try {
        const user = await user_1.UserModel.findById(ID);
        if (!user) {
            return res.status(404).json({ message: "Пользователя с таким ID не существует." });
        }
        const isPassValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPassValid) {
            return res.status(401).json({ message: "Неверный пароль." });
        }
        const token = (0, jwt_1.generateJwt)(ID, user.role);
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
exports.login = login;
