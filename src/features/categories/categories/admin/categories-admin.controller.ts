import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoriesHandler } from './create-categories/create-categories.handler';
import { GetAllCategoriesHandler } from './get-all-categories/get-all-categories.handler';
import { GetOneCategoriesHandler } from './get-one-categories/get-one-categories.handler';
import { UpdateCategoriesHandler } from './update-categories/update-categories.handler';
import { DeleteCategoriesHandler } from './delete-categories/delete-categories.handler';
import { CreateCategoriesRequest } from './create-categories/create-categories.request';
import { GetAllCategoriesRequest } from './get-all-categories/get-all-categories.request';
import { UpdateCategoriesRequest } from './update-categories/update-categories.request';

@ApiTags('admin / categories')
@ApiBearerAuth()
@Controller('admin/categories')
export class CategoriesAdminController {
  constructor(
    private readonly createHandler: CreateCategoriesHandler,
    private readonly getAllHandler: GetAllCategoriesHandler,
    private readonly getOneHandler: GetOneCategoriesHandler,
    private readonly updateHandler: UpdateCategoriesHandler,
    private readonly deleteHandler: DeleteCategoriesHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateCategoriesRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllCategoriesRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCategoriesRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
