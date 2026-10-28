import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSocialLinksHandler } from './create-social-links/create-social-links.handler';
import { GetAllSocialLinksHandler } from './get-all-social-links/get-all-social-links.handler';
import { GetOneSocialLinksHandler } from './get-one-social-links/get-one-social-links.handler';
import { UpdateSocialLinksHandler } from './update-social-links/update-social-links.handler';
import { DeleteSocialLinksHandler } from './delete-social-links/delete-social-links.handler';
import { CreateSocialLinksRequest } from './create-social-links/create-social-links.request';
import { GetAllSocialLinksRequest } from './get-all-social-links/get-all-social-links.request';
import { UpdateSocialLinksRequest } from './update-social-links/update-social-links.request';

@ApiTags('admin / social-links')
@ApiBearerAuth()
@Controller('admin/social-links')
export class SocialLinksAdminController {
  constructor(
    private readonly createHandler: CreateSocialLinksHandler,
    private readonly getAllHandler: GetAllSocialLinksHandler,
    private readonly getOneHandler: GetOneSocialLinksHandler,
    private readonly updateHandler: UpdateSocialLinksHandler,
    private readonly deleteHandler: DeleteSocialLinksHandler,
  ) {}

  @Post('create')
  async create(@Body() payload: CreateSocialLinksRequest) {
    return await this.createHandler.execute(payload);
  }

  @Get('list')
  async getAll(@Query() query: GetAllSocialLinksRequest) {
    return await this.getAllHandler.execute(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOneHandler.execute(id);
  }

  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateSocialLinksRequest) {
    return await this.updateHandler.execute(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}
