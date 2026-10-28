import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomProductHandler } from './create-custom-product/create-custom-product.handler';
import { CreateCustomProductRequest } from './create-custom-product/create-custom-product.request';
import { GetConstructorOptionsHandler } from './get-constructor-options/get-constructor-options.handler';
import { GetConstructorOptionsRequest } from './get-constructor-options/get-constructor-options.request';

@ApiTags('public / constructor')
@Controller('public/constructor')
export class CustomProductsPublicController {
  constructor(
    private readonly getOptionsHandler: GetConstructorOptionsHandler,
    private readonly createHandler: CreateCustomProductHandler,
  ) {}

  @Get()
  async getOptions(@Query() query: GetConstructorOptionsRequest) {
    return await this.getOptionsHandler.execute(query);
  }

  @Post()
  async create(@Body() payload: CreateCustomProductRequest) {
    return await this.createHandler.execute(payload);
  }
}
