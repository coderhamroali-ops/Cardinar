import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePartsHandler } from './create-parts/create-parts.handler';
import { GetAllPartsHandler } from './get-all-parts/get-all-parts.handler';
import { GetOnePartsHandler } from './get-one-parts/get-one-parts.handler';
import { UpdatePartsHandler } from './update-parts/update-parts.handler';
import { DeletePartsHandler } from './delete-parts/delete-parts.handler';
import { CreatePartsRequest } from './create-parts/create-parts.request';
import { GetAllPartsRequest } from './get-all-parts/get-all-parts.request';
import { UpdatePartsRequest } from './update-parts/update-parts.request';

@ApiTags('admin / parts')
@ApiBearerAuth()
@Controller('admin/parts')
export class PartsAdminController {
  constructor(
    private readonly createHandler: CreatePartsHandler,
    private readonly getAllHandler: GetAllPartsHandler,
    private readonly getOneHandler: GetOnePartsHandler,
    private readonly updateHandler: UpdatePartsHandler,
    private readonly deleteHandler: DeletePartsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreatePartsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllPartsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePartsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
