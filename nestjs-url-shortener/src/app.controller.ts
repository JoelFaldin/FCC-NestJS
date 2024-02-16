import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // POST http://localhost:3000/api/shorturl
  // {
  //   "url": "https://www.google.com"
  // }
  @Post('/api/shorturl')
  async shortUrl(@Res() res, @Body('url') url: string) {
      const shortenedUrl = await this.appService.shortenUrl(url);
      res.json(shortenedUrl);
  }

  // GET http://localhost:3000/api/shorturl/1
  // The last parameter can be any NUMBER.
  @Get('/api/shorturl/:url')
  async redirectUrl(@Res() res, @Param('url') url: string) {
    const existsUrl = await this.appService.searchUrl(url);
    
    if (existsUrl.redirect) {
      res.redirect(existsUrl.redirect);
    } else {
      res.json(existsUrl)
    }

  }
}
