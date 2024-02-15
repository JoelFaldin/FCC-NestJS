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

    async createManyPeople(arrayOfPeople: Array<any>): Promise<any> {
        const users = await this.userModel.create(arrayOfPeople);
        return users;
    }

    async newUser(newUserDTO: NewPersonDTO): Promise<User> {
        const user = new this.userModel(newUserDTO);
        await user.save();
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
}
