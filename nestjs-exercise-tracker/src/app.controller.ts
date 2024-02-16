import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/users')
  async saveUser(@Res() res, @Body('username') username: string) {
    const user = await this.appService.saveUser(username);
    res.json(user);
  }
}
