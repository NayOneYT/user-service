"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generateJwt = (_id, role) => {
    const payload = {
        _id,
        role
    };
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET_KEY, { expiresIn: "12h" });
};
exports.generateJwt = generateJwt;
