import { Document } from 'mongoose';
export interface User extends Document {
    username: {
        type: string,
        required: true
    },
}

export interface Exercise extends Document {
    user_id: {
        type: string,
        required: true
    },
    description: String,
    duration: Number,
    date: Date
}