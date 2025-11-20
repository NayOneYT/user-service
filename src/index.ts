import 'dotenv/config';
import { PORT } from "./config/config";
import connectDB from './config/db.config';
import express from "express";
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Сервер успешно запущен на http://localhost:${PORT}`);
        });
    });