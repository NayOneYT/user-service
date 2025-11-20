"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const config_1 = require("../config/config");
const generateJwt = (email, role) => {
    const payload = {
        email,
        role
    };
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET_KEY, { expiresIn: "1h" });
};
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
        const token = generateJwt(newUser.email, newUser.role);
        res.status(201).json({
            message: "Регистрация прошла успешно.",
            token
        });
    }
    catch (error) {
        console.error("Ошибка при регистрации:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера." });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Необходимо заполнить все обязательные поля (email, password)." });
    }
    try {
        const user = await user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователя с таким email не существует." });
        }
        const isPassValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPassValid) {
            return res.status(401).json({ message: "Неверный пароль." });
        }
        const token = generateJwt(email, user.role);
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
