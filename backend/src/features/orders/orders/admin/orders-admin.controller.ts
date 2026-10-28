import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllOrdersHandler } from './get-all-orders/get-all-orders.handler';
import { GetOneOrdersHandler } from './get-one-orders/get-one-orders.handler';
import { UpdateOrdersHandler } from './update-orders/update-orders.handler';
import { DeleteOrdersHandler } from './delete-orders/delete-orders.handler';

import { GetAllOrdersRequest } from './get-all-orders/get-all-orders.request';
import { UpdateOrdersRequest } from './update-orders/update-orders.request';

@ApiTags('admin / orders')
@ApiBearerAuth()
@Controller('admin/orders')
export class OrdersAdminController {
  constructor(
    private readonly getAllHandler: GetAllOrdersHandler,
    private readonly getOneHandler: GetOneOrdersHandler,
    private readonly updateHandler: UpdateOrdersHandler,
    private readonly deleteHandler: DeleteOrdersHandler,
  ) {}

  @Get('list')
  async getAll(@Query() query: GetAllOrdersRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrdersRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
