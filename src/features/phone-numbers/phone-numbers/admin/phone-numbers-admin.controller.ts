import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePhoneNumbersHandler } from './create-phone-numbers/create-phone-numbers.handler';
import { GetAllPhoneNumbersHandler } from './get-all-phone-numbers/get-all-phone-numbers.handler';
import { GetOnePhoneNumbersHandler } from './get-one-phone-numbers/get-one-phone-numbers.handler';
import { UpdatePhoneNumbersHandler } from './update-phone-numbers/update-phone-numbers.handler';
import { DeletePhoneNumbersHandler } from './delete-phone-numbers/delete-phone-numbers.handler';
import { CreatePhoneNumbersRequest } from './create-phone-numbers/create-phone-numbers.request';
import { GetAllPhoneNumbersRequest } from './get-all-phone-numbers/get-all-phone-numbers.request';
import { UpdatePhoneNumbersRequest } from './update-phone-numbers/update-phone-numbers.request';

@ApiTags('admin / phone-numbers')
@ApiBearerAuth()
@Controller('admin/phone-numbers')
export class PhoneNumbersAdminController {
  constructor(
    private readonly createHandler: CreatePhoneNumbersHandler,
    private readonly getAllHandler: GetAllPhoneNumbersHandler,
    private readonly getOneHandler: GetOnePhoneNumbersHandler,
    private readonly updateHandler: UpdatePhoneNumbersHandler,
    private readonly deleteHandler: DeletePhoneNumbersHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreatePhoneNumbersRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllPhoneNumbersRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdatePhoneNumbersRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
