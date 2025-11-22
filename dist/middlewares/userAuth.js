"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function userAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Нет токена, авторизуйтесь" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Неверный формат заголовка Authorization (должен быть 'Bearer токен')." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_KEY);
        req._id = decoded._id;
        req.role = decoded.role;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Неверный или просроченный токен" });
    }
}
