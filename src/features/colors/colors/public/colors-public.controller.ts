import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllColorsPublicHandler } from './get-all-colors/get-all-colors.handler';

@ApiTags('public / colors')
@Controller('public/colors')
export class ColorsPublicController {
  constructor(private readonly getAllHandler: GetAllColorsPublicHandler) {}

  @Get()
  async getAll() {
    return await this.getAllHandler.execute();
  }
}
