import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { exerciseSchema, userSchema } from 'schemas/schemas';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Exercise', schema: exerciseSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
