import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductImagesHandler } from './create-product-images/create-product-images.handler';
import { GetAllProductImagesHandler } from './get-all-product-images/get-all-product-images.handler';
import { GetOneProductImagesHandler } from './get-one-product-images/get-one-product-images.handler';
import { UpdateProductImagesHandler } from './update-product-images/update-product-images.handler';
import { DeleteProductImagesHandler } from './delete-product-images/delete-product-images.handler';
import { CreateProductImagesRequest } from './create-product-images/create-product-images.request';
import { GetAllProductImagesRequest } from './get-all-product-images/get-all-product-images.request';
import { UpdateProductImagesRequest } from './update-product-images/update-product-images.request';

@ApiTags('admin / product-images')
@ApiBearerAuth()
@Controller('admin/product-images')
export class ProductImagesAdminController {
  constructor(
    private readonly createHandler: CreateProductImagesHandler,
    private readonly getAllHandler: GetAllProductImagesHandler,
    private readonly getOneHandler: GetOneProductImagesHandler,
    private readonly updateHandler: UpdateProductImagesHandler,
    private readonly deleteHandler: DeleteProductImagesHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateProductImagesRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllProductImagesRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductImagesRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
