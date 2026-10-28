import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateArticulsHandler } from './create-articuls/create-articuls.handler';
import { GetAllArticulsHandler } from './get-all-articuls/get-all-articuls.handler';
import { GetOneArticulsHandler } from './get-one-articuls/get-one-articuls.handler';
import { UpdateArticulsHandler } from './update-articuls/update-articuls.handler';
import { DeleteArticulsHandler } from './delete-articuls/delete-articuls.handler';
import { CreateArticulsRequest } from './create-articuls/create-articuls.request';
import { GetAllArticulsRequest } from './get-all-articuls/get-all-articuls.request';
import { UpdateArticulsRequest } from './update-articuls/update-articuls.request';

@ApiTags('admin / articuls')
@ApiBearerAuth()
@Controller('admin/articuls')
export class ArticulsAdminController {
  constructor(
    private readonly createHandler: CreateArticulsHandler,
    private readonly getAllHandler: GetAllArticulsHandler,
    private readonly getOneHandler: GetOneArticulsHandler,
    private readonly updateHandler: UpdateArticulsHandler,
    private readonly deleteHandler: DeleteArticulsHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateArticulsRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllArticulsRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateArticulsRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
