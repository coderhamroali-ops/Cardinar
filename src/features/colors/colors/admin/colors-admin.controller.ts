import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateColorsHandler } from './create-colors/create-colors.handler';
import { GetAllColorsHandler } from './get-all-colors/get-all-colors.handler';
import { GetOneColorsHandler } from './get-one-colors/get-one-colors.handler';
import { UpdateColorsHandler } from './update-colors/update-colors.handler';
import { DeleteColorsHandler } from './delete-colors/delete-colors.handler';
import { CreateColorsRequest } from './create-colors/create-colors.request';
import { GetAllColorsRequest } from './get-all-colors/get-all-colors.request';
import { UpdateColorsRequest } from './update-colors/update-colors.request';

@ApiTags('admin / colors')
@ApiBearerAuth()
@Controller('admin/colors')
export class ColorsAdminController {
  constructor(
    private readonly createHandler: CreateColorsHandler,
    private readonly getAllHandler: GetAllColorsHandler,
    private readonly getOneHandler: GetOneColorsHandler,
    private readonly updateHandler: UpdateColorsHandler,
    private readonly deleteHandler: DeleteColorsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateColorsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllColorsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateColorsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
