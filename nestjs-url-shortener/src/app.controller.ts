import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/shorturl')
  async shortUrl(@Res() res, @Body('url') url: string) {
      const shortenedUrl = await this.appService.shortenUrl(url);
      res.json(shortenedUrl);
  }
}
