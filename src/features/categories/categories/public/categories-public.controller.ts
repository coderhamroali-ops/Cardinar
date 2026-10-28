import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCategoriesPublicHandler } from './get-all-categories/get-all-categories.handler';

@ApiTags('public / categories')
@Controller('public/categories')
export class CategoriesPublicController {
  constructor(private readonly getAllHandler: GetAllCategoriesPublicHandler) {}

  @Get()
  async getAll() {
    return await this.getAllHandler.execute();
  }
}
