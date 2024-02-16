import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'interfaces/user.interface';
import { Model } from 'mongoose';
import { Exercise } from '../interfaces/user.interface'

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly userModule: Model<User>,
    @InjectModel('Exercise') private readonly exerciseModule: Model<Exercise>
  ) {};

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

  async getUsers() {
    const users = await this.userModule.find({}).select("_id username");

    if (!users) {
      return { error: "No users found!" };
    } else {
      return users;
    }
  }

  async saveExercises(filters: Exercise, id: string) {
    const { description, duration, date } = filters;

    try {
      const user = await this.userModule.findById(id);

      if (!user) {
        return { error: 'User not found!' }
      } else {
        const exercise = new this.exerciseModule({
          user_id: user._id,
          description,
          duration,
          date: date ? new Date(date) : new Date()
        });
        const savedExercise = await exercise.save();

        const resDate = new Date(savedExercise.date);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  
        const dayOfWeek = daysOfWeek[resDate.getUTCDay()];
        const month = months[resDate.getUTCMonth()];
        const day = resDate.getUTCDate();
        const year = resDate.getUTCFullYear();
  
        // Format dat:
        const formattedDay = day < 10 ? `0${day}` : day;
  
        const formattedDate = `${dayOfWeek} ${month} ${formattedDay} ${year}`;
  
        const resJSON = {
          _id: user._id,
          username: user.username,
          description: savedExercise.description,
          duration: savedExercise.duration,
          date: formattedDate,
        };
        
        return resJSON;
      }
    } catch (error) {
      return { error: "There was an error saving the exercise D:" };
    }
  }

  async filterUsers(from: string, to: string, limit: number, id: string) {
    const user = await this.userModule.findById(id);

    if (!user) {
      return { error: "User not found D:" }
    }

    let date = {};

    if (from) {
      date["$gte"] = new Date(from);
    }
    if (to) {
      date["$lte"] = new Date(to);
    }

    let filter: { user_id: string, date?: object } = {
      user_id: id,
    };
  
    if (from || to) {
      filter.date = date;
    }

    const exercises = await this.exerciseModule.find(filter).limit(+limit ?? 100);
    
    const log = exercises.map(exercise => ({
      desciption: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }));

    return {
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log
    }
  }
}
