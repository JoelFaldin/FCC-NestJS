import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/whoami')
  getHeaderInfo(@Res() res, @Req() req) {
    const info = this.appService.getHeaderInfo(req);
    res.json(info);
  }
}
