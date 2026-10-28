import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateMaterialsHandler } from './create-materials/create-materials.handler';
import { GetAllMaterialsHandler } from './get-all-materials/get-all-materials.handler';
import { GetOneMaterialsHandler } from './get-one-materials/get-one-materials.handler';
import { UpdateMaterialsHandler } from './update-materials/update-materials.handler';
import { DeleteMaterialsHandler } from './delete-materials/delete-materials.handler';
import { CreateMaterialsRequest } from './create-materials/create-materials.request';
import { GetAllMaterialsRequest } from './get-all-materials/get-all-materials.request';
import { UpdateMaterialsRequest } from './update-materials/update-materials.request';

@ApiTags('admin / materials')
@ApiBearerAuth()
@Controller('admin/materials')
export class MaterialsAdminController {
  constructor(
    private readonly createHandler: CreateMaterialsHandler,
    private readonly getAllHandler: GetAllMaterialsHandler,
    private readonly getOneHandler: GetOneMaterialsHandler,
    private readonly updateHandler: UpdateMaterialsHandler,
    private readonly deleteHandler: DeleteMaterialsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateMaterialsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllMaterialsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateMaterialsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
