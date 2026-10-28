import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSiteHandler } from './get-site/get-site.handler';

@ApiTags('public / site')
@Controller('public/site')
export class SitePublicController {
  constructor(private readonly getHandler: GetSiteHandler) {}

  @Get()
  async get() {
    return await this.getHandler.execute();
  }
}
