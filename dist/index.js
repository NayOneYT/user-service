"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config/config");
const db_config_1 = __importDefault(require("./config/db.config"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_config_1.default)()
    .then(() => {
    app.listen(config_1.PORT, () => {
        console.log(`Сервер успешно запущен на http://localhost:${config_1.PORT}`);
    });
});
