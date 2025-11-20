"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const ROLES = ["user", "admin"];
const STATUSES = ["active", "inactive"];
const userSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ROLES,
    },
    status: {
        type: String,
        required: true,
        default: "active",
        enum: STATUSES,
    }
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
