import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticInfoEntity } from './entities/static-info.entity';
import { StaticInfoAdminController } from './static-info/admin/static-info-admin.controller';
import { GetStaticInfoHandler } from './static-info/admin/get-static-info/get-static-info.handler';
import { UpsertStaticInfoHandler } from './static-info/admin/upsert-static-info/upsert-static-info.handler';

@Module({
  imports: [TypeOrmModule.forFeature([StaticInfoEntity])],
  controllers: [StaticInfoAdminController],
  providers: [GetStaticInfoHandler, UpsertStaticInfoHandler],
})
export class StaticInfoModule {}
