import { Schema } from 'mongoose';

export const urlSchema = new Schema({
    original_url: {
      type: String,
      required: true
    },
    shortened_url: {
      type: Number,
      required: true
    }
});
