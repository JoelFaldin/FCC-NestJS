import { Controller, Get, Post, Param, Query, Res, Body } from '@nestjs/common';
import { RouteService } from './app.service';
import { join } from 'path';
import { Response } from 'express';
import { NewRequestDTO } from '../dto/request.dto';

@Controller()
export class AppController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  serveHTML(@Res() res: Response) {
    const absolutePath = join(__dirname, '..', 'public', 'index.html');
    res.sendFile(absolutePath);
  }

  @Get('/json')
  handleJson() {
    return this.routeService.handleJson();
  }

  @Get('/now')
  getNow(@Res() res: Response): void {
    const date = this.routeService.getNow();
    res.json(date);
  }

  @Get('/:word/echo')
  getWord(@Param('word') word: string, @Res() res: Response): void {
    const json = this.routeService.getWord(word);
    
    res.setHeader('Content-type', 'application/json');
    res.json(json);
  }

  // Url for this route (in Postman): http://localhost:3000/name?firstname=Joel&lastname=Richardson
  @Get('/name')
  getNames(@Query() params: Record<string, any>, @Res() res: Response) {
    const firstname = params.firstname;
    const lastname = params.lastname;
    const nameObject = this.routeService.getNames(firstname, lastname);

    res.json(nameObject);
  }

  // Url for this route (in Postman): http://localhost:3000/name, it uses a POST method, dont forget to pass:
  // { "name": "Joel", "lastname": "F" } as the body!
  @Post('/name')
  postName(@Body() data: NewRequestDTO, @Res() res: Response) {
    const namesJSON = this.routeService.postData(data.name, data.lastname);
    res.json(namesJSON)
  }
}
