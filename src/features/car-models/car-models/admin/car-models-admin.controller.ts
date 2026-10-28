import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCarModelsHandler } from './create-car-models/create-car-models.handler';
import { GetAllCarModelsHandler } from './get-all-car-models/get-all-car-models.handler';
import { GetOneCarModelsHandler } from './get-one-car-models/get-one-car-models.handler';
import { UpdateCarModelsHandler } from './update-car-models/update-car-models.handler';
import { DeleteCarModelsHandler } from './delete-car-models/delete-car-models.handler';
import { CreateCarModelsRequest } from './create-car-models/create-car-models.request';
import { GetAllCarModelsRequest } from './get-all-car-models/get-all-car-models.request';
import { UpdateCarModelsRequest } from './update-car-models/update-car-models.request';

@ApiTags('admin / car-models')
@ApiBearerAuth()
@Controller('admin/car-models')
export class CarModelsAdminController {
  constructor(
    private readonly createHandler: CreateCarModelsHandler,
    private readonly getAllHandler: GetAllCarModelsHandler,
    private readonly getOneHandler: GetOneCarModelsHandler,
    private readonly updateHandler: UpdateCarModelsHandler,
    private readonly deleteHandler: DeleteCarModelsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateCarModelsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllCarModelsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCarModelsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
