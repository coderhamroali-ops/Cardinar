import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllBranchesPublicHandler } from './get-all-branches/get-all-branches.handler';
import { GetAllBranchesPublicRequest } from './get-all-branches/get-all-branches.request';

@ApiTags('public / branches')
@Controller('public/branches')
export class BranchesPublicController {
  constructor(private readonly getAllHandler: GetAllBranchesPublicHandler) {}

  @Get()
  async getAll(@Query() query: GetAllBranchesPublicRequest) {
    return await this.getAllHandler.execute(query);
  }
}
