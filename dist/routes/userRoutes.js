"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const userRouter = (0, express_1.Router)();
userRouter.get('/:id', userAuth_1.default, userController_1.getUserById);
userRouter.get('/', () => { });
userRouter.patch('/:id/block', () => { });
exports.default = userRouter;
