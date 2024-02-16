import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { urlSchema } from './schemas/url.schema'
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Url', schema: urlSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
