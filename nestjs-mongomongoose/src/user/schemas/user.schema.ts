import { Schema } from 'mongoose';

export const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favoriteFoods: {
        type: Array<string>,
        required: true
    }
})