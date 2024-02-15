import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RouteService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RouteService],
})
export class AppModule {}
