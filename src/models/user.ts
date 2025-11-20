import { Schema, model } from "mongoose";

const ROLES = ["user", "admin"];
const STATUSES = ["active", "inactive"];

const userSchema = new Schema({
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

export const UserModel = model("user", userSchema);