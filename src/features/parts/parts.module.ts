import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from './entities/part.entity';
import { PartsAdminController } from './parts/admin/parts-admin.controller';
import { CreatePartsHandler } from './parts/admin/create-parts/create-parts.handler';
import { GetAllPartsHandler } from './parts/admin/get-all-parts/get-all-parts.handler';
import { GetOnePartsHandler } from './parts/admin/get-one-parts/get-one-parts.handler';
import { UpdatePartsHandler } from './parts/admin/update-parts/update-parts.handler';
import { DeletePartsHandler } from './parts/admin/delete-parts/delete-parts.handler';

@Module({
  imports: [TypeOrmModule.forFeature([PartEntity])],
  controllers: [
    PartsAdminController,
  ],
  providers: [
    CreatePartsHandler,
    GetAllPartsHandler,
    GetOnePartsHandler,
    UpdatePartsHandler,
    DeletePartsHandler,
  ],
})
export class PartsModule {}
