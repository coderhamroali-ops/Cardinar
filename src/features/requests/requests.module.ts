import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entities/request.entity';
import { RequestsAdminController } from './requests/admin/requests-admin.controller';
import { RequestsPublicController } from './requests/public/requests-public.controller';
import { GetAllRequestsHandler } from './requests/admin/get-all-requests/get-all-requests.handler';
import { GetOneRequestsHandler } from './requests/admin/get-one-requests/get-one-requests.handler';
import { DeleteRequestsHandler } from './requests/admin/delete-requests/delete-requests.handler';
import { CreateRequestsPublicHandler } from './requests/public/create-requests/create-requests.handler';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity])],
  controllers: [
    RequestsAdminController,
    RequestsPublicController,
  ],
  providers: [
    GetAllRequestsHandler,
    GetOneRequestsHandler,
    DeleteRequestsHandler,
    CreateRequestsPublicHandler,
  ],
})
export class RequestsModule {}
