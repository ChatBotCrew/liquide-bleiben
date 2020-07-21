import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/offers')
export class OffersController {
  @Get()
  findAll(@Query() qParams): [] {
    return [];
  }
}
