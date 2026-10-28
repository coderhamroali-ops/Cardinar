import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCarMakesHandler } from './create-car-makes/create-car-makes.handler';
import { GetAllCarMakesHandler } from './get-all-car-makes/get-all-car-makes.handler';
import { GetOneCarMakesHandler } from './get-one-car-makes/get-one-car-makes.handler';
import { UpdateCarMakesHandler } from './update-car-makes/update-car-makes.handler';
import { DeleteCarMakesHandler } from './delete-car-makes/delete-car-makes.handler';
import { CreateCarMakesRequest } from './create-car-makes/create-car-makes.request';
import { GetAllCarMakesRequest } from './get-all-car-makes/get-all-car-makes.request';
import { UpdateCarMakesRequest } from './update-car-makes/update-car-makes.request';

@ApiTags('admin / car-makes')
@ApiBearerAuth()
@Controller('admin/car-makes')
export class CarMakesAdminController {
  constructor(
    private readonly createHandler: CreateCarMakesHandler,
    private readonly getAllHandler: GetAllCarMakesHandler,
    private readonly getOneHandler: GetOneCarMakesHandler,
    private readonly updateHandler: UpdateCarMakesHandler,
    private readonly deleteHandler: DeleteCarMakesHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateCarMakesRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllCarMakesRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCarMakesRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
