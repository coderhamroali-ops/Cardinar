import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBranchesHandler } from './create-branches/create-branches.handler';
import { GetAllBranchesHandler } from './get-all-branches/get-all-branches.handler';
import { GetOneBranchesHandler } from './get-one-branches/get-one-branches.handler';
import { UpdateBranchesHandler } from './update-branches/update-branches.handler';
import { DeleteBranchesHandler } from './delete-branches/delete-branches.handler';
import { CreateBranchesRequest } from './create-branches/create-branches.request';
import { GetAllBranchesRequest } from './get-all-branches/get-all-branches.request';
import { UpdateBranchesRequest } from './update-branches/update-branches.request';

@ApiTags('admin / branches')
@ApiBearerAuth()
@Controller('admin/branches')
export class BranchesAdminController {
  constructor(
    private readonly createHandler: CreateBranchesHandler,
    private readonly getAllHandler: GetAllBranchesHandler,
    private readonly getOneHandler: GetOneBranchesHandler,
    private readonly updateHandler: UpdateBranchesHandler,
    private readonly deleteHandler: DeleteBranchesHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateBranchesRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllBranchesRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBranchesRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
