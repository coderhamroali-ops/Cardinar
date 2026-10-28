import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCarMakesPublicHandler } from './get-all-car-makes/get-all-car-makes.handler';

@ApiTags('public / car-makes')
@Controller('public/car-makes')
export class CarMakesPublicController {
  constructor(private readonly getAllHandler: GetAllCarMakesPublicHandler) {}

  @Get()
  async getAll() {
    return await this.getAllHandler.execute();
  }
}
