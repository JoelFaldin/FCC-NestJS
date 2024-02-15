import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interfaces/user.interface';
import { NewPersonDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        return user;
    }

    async getByName(name: string): Promise<any> {
        const user = await this.userModel.find({ name: name });
        return user;
    }

    async newUser(newUserDTO: NewPersonDTO): Promise<User> {
        const user = new this.userModel(newUserDTO);
        await user.save();
        return user;
    }

    async createManyPeople(arrayOfPeople: Array<any>): Promise<any> {
        const users = await this.userModel.create(arrayOfPeople);
        return users;
    }

    async findByFood(food: string): Promise<User> {
        const user = await this.userModel.findOne({ favoriteFoods: { $in: [food] } });
        return user;
    }

    async getPersonById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        return user;
    }

    async findEditThenSave(id: string): Promise<User | any> {
        const foodToAdd = 'hamburger';

        try {
            const user = await this.userModel.findById(id);
            user.favoriteFoods.push(foodToAdd);
            await user.save();

            return user;
        } catch (error) {
            return { error: 'User not found.' }
        }
    }

    async updateAge(id: string, newAge: number): Promise<User> {
        const user = await this.userModel.findById(id);
        user.age = newAge;
        return user;
    }

    async updateUser(id: string, newUserDTO: NewPersonDTO): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, newUserDTO, { new: true });
        return user;
    }

    async deleteUser(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return deletedUser;
    }

    async deleteMany(): Promise<any> {
        const nameToRemove = 'Joel';
        
        const deletedUsers = await this.userModel.deleteMany({ name: nameToRemove });
        return deletedUsers;
    }

    async queryChain(): Promise<any> {
        const foodToSearch = "fries";

        const users = await this.userModel.find({ favoriteFoods: { $in: [foodToSearch] } })
            .sort({ name: 1 })
            .limit(2);
        
        return users;
    }
}
