import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllProductsPublicHandler } from './get-all-products/get-all-products.handler';
import { GetAllProductsPublicRequest } from './get-all-products/get-all-products.request';
import { GetOneProductPublicHandler } from './get-one-product/get-one-product.handler';
import { GetSimilarProductsPublicHandler } from './get-similar-products/get-similar-products.handler';

@ApiTags('public / products')
@Controller('public/products')
export class ProductsPublicController {
  constructor(
    private readonly getAllHandler: GetAllProductsPublicHandler,
    private readonly getOneHandler: GetOneProductPublicHandler,
    private readonly getSimilarHandler: GetSimilarProductsPublicHandler,
  ) {}

  @Get()
  async getAll(@Query() query: GetAllProductsPublicRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Get(':id/similar')
  async getSimilar(@Param('id', ParseIntPipe) id: number) {
    return await this.getSimilarHandler.execute(id);
  }
}
