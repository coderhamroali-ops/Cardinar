import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetStaticInfoHandler } from './get-static-info/get-static-info.handler';
import { UpsertStaticInfoHandler } from './upsert-static-info/upsert-static-info.handler';
import { UpsertStaticInfoRequest } from './upsert-static-info/upsert-static-info.request';

@ApiTags('admin / static-info')
@ApiBearerAuth()
@Controller('admin/static-info')
export class StaticInfoAdminController {
  constructor(
    private readonly getHandler: GetStaticInfoHandler,
    private readonly upsertHandler: UpsertStaticInfoHandler,
  ) {}

  @Get()
  async get() {
    return await this.getHandler.execute();
  }

  @Put()
  async upsert(@Body() payload: UpsertStaticInfoRequest) {
    return await this.upsertHandler.execute(payload);
  }
}
