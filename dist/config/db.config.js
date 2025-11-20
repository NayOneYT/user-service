"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const connectDB = async () => {
    if (!config_1.MONGODB_URL) {
        console.error("Ошибка: Строка подключения MONGODB_URL в .env не задана.");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(config_1.MONGODB_URL);
        console.log("Успешное подключение к БД.");
    }
    catch (error) {
        console.error(`Ошибка подключения к БД: ${error}`);
        process.exit(1);
    }
};
exports.default = connectDB;
