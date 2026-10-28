import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductsHandler } from './create-products/create-products.handler';
import { GetAllProductsHandler } from './get-all-products/get-all-products.handler';
import { GetOneProductsHandler } from './get-one-products/get-one-products.handler';
import { UpdateProductsHandler } from './update-products/update-products.handler';
import { DeleteProductsHandler } from './delete-products/delete-products.handler';
import { CreateProductsRequest } from './create-products/create-products.request';
import { GetAllProductsRequest } from './get-all-products/get-all-products.request';
import { UpdateProductsRequest } from './update-products/update-products.request';

@ApiTags('admin / products')
@ApiBearerAuth()
@Controller('admin/products')
export class ProductsAdminController {
  constructor(
    private readonly createHandler: CreateProductsHandler,
    private readonly getAllHandler: GetAllProductsHandler,
    private readonly getOneHandler: GetOneProductsHandler,
    private readonly updateHandler: UpdateProductsHandler,
    private readonly deleteHandler: DeleteProductsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateProductsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllProductsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
