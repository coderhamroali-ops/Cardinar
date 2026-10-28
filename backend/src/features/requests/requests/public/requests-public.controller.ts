import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OptionalAuth } from '../../../../core/decorators/auth.decorator';
import { CurrentUser, TokenPayload } from '../../../../core/decorators/current-user.decorator';
import { CreateRequestsPublicHandler } from './create-requests/create-requests.handler';
import { CreateRequestsPublicRequest } from './create-requests/create-requests.request';

@ApiTags('public / requests')
@Controller('public/requests')
export class RequestsPublicController {
  constructor(private readonly createHandler: CreateRequestsPublicHandler) {}

  @OptionalAuth()
  @Post()
  async create(@Body() payload: CreateRequestsPublicRequest, @CurrentUser() user?: TokenPayload) {
    return await this.createHandler.execute(payload, user?.sub);
  }
}
