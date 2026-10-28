import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductColorsHandler } from './create-product-colors/create-product-colors.handler';
import { GetAllProductColorsHandler } from './get-all-product-colors/get-all-product-colors.handler';
import { GetOneProductColorsHandler } from './get-one-product-colors/get-one-product-colors.handler';
import { UpdateProductColorsHandler } from './update-product-colors/update-product-colors.handler';
import { DeleteProductColorsHandler } from './delete-product-colors/delete-product-colors.handler';
import { CreateProductColorsRequest } from './create-product-colors/create-product-colors.request';
import { GetAllProductColorsRequest } from './get-all-product-colors/get-all-product-colors.request';
import { UpdateProductColorsRequest } from './update-product-colors/update-product-colors.request';

@ApiTags('admin / product-colors')
@ApiBearerAuth()
@Controller('admin/product-colors')
export class ProductColorsAdminController {
  constructor(
    private readonly createHandler: CreateProductColorsHandler,
    private readonly getAllHandler: GetAllProductColorsHandler,
    private readonly getOneHandler: GetOneProductColorsHandler,
    private readonly updateHandler: UpdateProductColorsHandler,
    private readonly deleteHandler: DeleteProductColorsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateProductColorsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllProductColorsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductColorsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
