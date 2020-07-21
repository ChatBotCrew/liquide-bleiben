import { OffersController } from './controllers/offers.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    OffersController,
    AppController,
  ],
  providers: [AppService],
})
export class AppModule { }
