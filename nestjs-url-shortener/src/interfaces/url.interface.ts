import { Document } from "mongoose";

export interface Url extends Document {
    readonly original_url: {
        type: string,
        required: true
    }
    readonly shortened_url: {
        type: string,
        required: true
    }
}