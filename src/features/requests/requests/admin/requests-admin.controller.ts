import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllRequestsHandler } from './get-all-requests/get-all-requests.handler';
import { GetOneRequestsHandler } from './get-one-requests/get-one-requests.handler';
import { DeleteRequestsHandler } from './delete-requests/delete-requests.handler';

import { GetAllRequestsRequest } from './get-all-requests/get-all-requests.request';


@ApiTags('admin / requests')
@ApiBearerAuth()
@Controller('admin/requests')
export class RequestsAdminController {
  constructor(
    private readonly getAllHandler: GetAllRequestsHandler,
    private readonly getOneHandler: GetOneRequestsHandler,
    private readonly deleteHandler: DeleteRequestsHandler,
  ) {}

  @Get('list')
  async getAll(@Query() query: GetAllRequestsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
