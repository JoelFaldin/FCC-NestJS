import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'interfaces/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private readonly userModule: Model<User>) {};

  async saveUser(username: string) {
    const user = new this.userModule({
      username
    })
    
    try {
      const savedUser = await user.save();
      return savedUser;
    } catch(error) {
      return { error: 'The user couldnt be saved' };
    }
  }
}
