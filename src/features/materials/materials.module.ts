import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialEntity } from './entities/material.entity';
import { MaterialsAdminController } from './materials/admin/materials-admin.controller';
import { CreateMaterialsHandler } from './materials/admin/create-materials/create-materials.handler';
import { GetAllMaterialsHandler } from './materials/admin/get-all-materials/get-all-materials.handler';
import { GetOneMaterialsHandler } from './materials/admin/get-one-materials/get-one-materials.handler';
import { UpdateMaterialsHandler } from './materials/admin/update-materials/update-materials.handler';
import { DeleteMaterialsHandler } from './materials/admin/delete-materials/delete-materials.handler';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialEntity])],
  controllers: [
    MaterialsAdminController,
  ],
  providers: [
    CreateMaterialsHandler,
    GetAllMaterialsHandler,
    GetOneMaterialsHandler,
    UpdateMaterialsHandler,
    DeleteMaterialsHandler,
  ],
})
export class MaterialsModule {}
