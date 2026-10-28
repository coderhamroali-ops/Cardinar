import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomModelEntity } from './entities/custom-model.entity';
import { CustomModelsAdminController } from './custom-models/admin/custom-models-admin.controller';
import { CreateCustomModelsHandler } from './custom-models/admin/create-custom-models/create-custom-models.handler';
import { GetAllCustomModelsHandler } from './custom-models/admin/get-all-custom-models/get-all-custom-models.handler';
import { GetOneCustomModelsHandler } from './custom-models/admin/get-one-custom-models/get-one-custom-models.handler';
import { UpdateCustomModelsHandler } from './custom-models/admin/update-custom-models/update-custom-models.handler';
import { DeleteCustomModelsHandler } from './custom-models/admin/delete-custom-models/delete-custom-models.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CustomModelEntity])],
  controllers: [
    CustomModelsAdminController,
  ],
  providers: [
    CreateCustomModelsHandler,
    GetAllCustomModelsHandler,
    GetOneCustomModelsHandler,
    UpdateCustomModelsHandler,
    DeleteCustomModelsHandler,
  ],
})
export class CustomModelsModule {}
