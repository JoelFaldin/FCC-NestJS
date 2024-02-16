import { Schema } from "mongoose";

export const exerciseSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    description: String,
    duration: Number,
    date: Date
})

export const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})