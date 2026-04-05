import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Invalid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    otpCode: {
        type: String,
        required: false
    },
    otpExpired: {
        type: Date,
        required: false
    },
    isVerfied: {
        type: Boolean,
        required: false
    }

}, { timestamps: true });





export default mongoose.model("User", userSchema);