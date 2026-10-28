import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllUsersHandler } from './get-all-users/get-all-users.handler';
import { GetOneUsersHandler } from './get-one-users/get-one-users.handler';
import { UpdateUsersHandler } from './update-users/update-users.handler';
import { DeleteUsersHandler } from './delete-users/delete-users.handler';

import { GetAllUsersRequest } from './get-all-users/get-all-users.request';
import { UpdateUsersRequest } from './update-users/update-users.request';

@ApiTags('admin / users')
@ApiBearerAuth()
@Controller('admin/users')
export class UsersAdminController {
  constructor(
    private readonly getAllHandler: GetAllUsersHandler,
    private readonly getOneHandler: GetOneUsersHandler,
    private readonly updateHandler: UpdateUsersHandler,
    private readonly deleteHandler: DeleteUsersHandler,
  ) {}

  @Get('list')
  async getAll(@Query() query: GetAllUsersRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUsersRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
