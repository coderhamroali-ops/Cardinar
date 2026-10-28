import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCustomModelsHandler } from './create-custom-models/create-custom-models.handler';
import { GetAllCustomModelsHandler } from './get-all-custom-models/get-all-custom-models.handler';
import { GetOneCustomModelsHandler } from './get-one-custom-models/get-one-custom-models.handler';
import { UpdateCustomModelsHandler } from './update-custom-models/update-custom-models.handler';
import { DeleteCustomModelsHandler } from './delete-custom-models/delete-custom-models.handler';
import { CreateCustomModelsRequest } from './create-custom-models/create-custom-models.request';
import { GetAllCustomModelsRequest } from './get-all-custom-models/get-all-custom-models.request';
import { UpdateCustomModelsRequest } from './update-custom-models/update-custom-models.request';

@ApiTags('admin / custom-models')
@ApiBearerAuth()
@Controller('admin/custom-models')
export class CustomModelsAdminController {
  constructor(
    private readonly createHandler: CreateCustomModelsHandler,
    private readonly getAllHandler: GetAllCustomModelsHandler,
    private readonly getOneHandler: GetOneCustomModelsHandler,
    private readonly updateHandler: UpdateCustomModelsHandler,
    private readonly deleteHandler: DeleteCustomModelsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateCustomModelsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllCustomModelsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCustomModelsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
