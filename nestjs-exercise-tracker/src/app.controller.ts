import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Exercise } from 'interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // POST http://localhost:3000/api/users
  // {
  //   "username": "Josh"
  // }
  @Post('/api/users')
  async saveUser(@Res() res, @Body('username') username: string) {
    const user = await this.appService.saveUser(username);
    res.json(user);
  }

  // GET http://localhost:3000/api/users
  @Get('/api/users')
  async getUsers(@Res() res) {
    const users = await this.appService.getUsers();
    res.json(users);
  }

  // POST http://localhost:3000/api/users/65cfbdf72bf5daf04b09955f/exercises
  // {
  //   "description": "Swim",
  //   "duration": 30,
  //   "date": ""
  // }
  @Post('/api/users/:_id/exercises')
  async saveExercise(@Res() res, @Body() filters: Exercise, @Param('_id') _id: string) {
    const exercises = await this.appService.saveExercises(filters, _id);
    res.json(exercises);
  }

  // GET http://localhost:3000/api/users/65cfbdf72bf5daf04b09955f/logs?from=2024-02-11&to=2024-02-17&limit=5
  @Get('/api/users/:_id/logs')
  async filterUsers(@Res() res, @Query('from') from: string, @Query('to') to: string, @Query('limit') limit: number, @Param('_id') _id: string) {
    const userObject = await this.appService.filterUsers(from, to, limit, _id);
    res.json(userObject);
  }
}
