import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serveHTML(@Res() res) {
    const htmlPath = join(__dirname, '..', 'public', 'index.html');
    res.sendFile(htmlPath);
  }

  // http://localhost:3000/api/2015-12-25
  // http://localhost:3000/api/1451001600000
  @Get('/api/:date')
  dateRoute(@Res() res, @Param('date') date: string) {
    const trueDate = this.appService.handleRoutes(date);
    res.json(trueDate);
  }

  // http://localhost:3000/api
  @Get('/api')
  apiRoute(@Res() res) {
    const date = this.appService.handleApi();
    res.json(date);
  }
}
