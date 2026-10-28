import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBannersHandler } from './create-banners/create-banners.handler';
import { GetAllBannersHandler } from './get-all-banners/get-all-banners.handler';
import { GetOneBannersHandler } from './get-one-banners/get-one-banners.handler';
import { UpdateBannersHandler } from './update-banners/update-banners.handler';
import { DeleteBannersHandler } from './delete-banners/delete-banners.handler';
import { CreateBannersRequest } from './create-banners/create-banners.request';
import { GetAllBannersRequest } from './get-all-banners/get-all-banners.request';
import { UpdateBannersRequest } from './update-banners/update-banners.request';

@ApiTags('admin / banners')
@ApiBearerAuth()
@Controller('admin/banners')
export class BannersAdminController {
  constructor(
    private readonly createHandler: CreateBannersHandler,
    private readonly getAllHandler: GetAllBannersHandler,
    private readonly getOneHandler: GetOneBannersHandler,
    private readonly updateHandler: UpdateBannersHandler,
    private readonly deleteHandler: DeleteBannersHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateBannersRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllBannersRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBannersRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
