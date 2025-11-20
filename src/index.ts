import 'dotenv/config';
import { PORT } from "./config/config";
import connectDB from './config/db.config';
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на http://localhost:${PORT}`);
        });
    });