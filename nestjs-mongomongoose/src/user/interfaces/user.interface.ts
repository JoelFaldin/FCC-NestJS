import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: string;
    age: number;
    readonly favoriteFoods: Array<string>;
}