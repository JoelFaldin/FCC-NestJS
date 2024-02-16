import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/api/fileanalyse')
  @UseInterceptors(FileInterceptor('upfile'))
  analizeFile(@Res() res, @UploadedFile() file: Express.Multer.File) {
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  }
}
