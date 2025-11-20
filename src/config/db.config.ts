import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

const connectDB = async () => {
    if (!MONGODB_URL) {
        console.error("Ошибка: Строка подключения MONGODB_URL в .env не задана.");
        process.exit(1); 
    }
    try {
        await mongoose.connect(MONGODB_URL); 
        console.log("Успешное подключение к БД.");
    } catch (error) {
        console.error(`Ошибка подключения к БД: ${error}`);
        process.exit(1); 
    }
};

export default connectDB;