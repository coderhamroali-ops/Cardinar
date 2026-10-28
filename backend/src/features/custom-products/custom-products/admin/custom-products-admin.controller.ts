import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllCustomProductsHandler } from './get-all-custom-products/get-all-custom-products.handler';
import { GetOneCustomProductsHandler } from './get-one-custom-products/get-one-custom-products.handler';
import { UpdateCustomProductsHandler } from './update-custom-products/update-custom-products.handler';
import { DeleteCustomProductsHandler } from './delete-custom-products/delete-custom-products.handler';

import { GetAllCustomProductsRequest } from './get-all-custom-products/get-all-custom-products.request';
import { UpdateCustomProductsRequest } from './update-custom-products/update-custom-products.request';

@ApiTags('admin / custom-products')
@ApiBearerAuth()
@Controller('admin/custom-products')
export class CustomProductsAdminController {
  constructor(
    private readonly getAllHandler: GetAllCustomProductsHandler,
    private readonly getOneHandler: GetOneCustomProductsHandler,
    private readonly updateHandler: UpdateCustomProductsHandler,
    private readonly deleteHandler: DeleteCustomProductsHandler,
  ) {}

  @Get('list')
  async getAll(@Query() query: GetAllCustomProductsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomProductsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
