import { Document } from 'mongoose';
export interface User extends Document {
    username: {
        type: string,
        required: true
    }
}