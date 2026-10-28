import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelEntity } from './entities/car-model.entity';
import { CarModelsAdminController } from './car-models/admin/car-models-admin.controller';
import { CreateCarModelsHandler } from './car-models/admin/create-car-models/create-car-models.handler';
import { GetAllCarModelsHandler } from './car-models/admin/get-all-car-models/get-all-car-models.handler';
import { GetOneCarModelsHandler } from './car-models/admin/get-one-car-models/get-one-car-models.handler';
import { UpdateCarModelsHandler } from './car-models/admin/update-car-models/update-car-models.handler';
import { DeleteCarModelsHandler } from './car-models/admin/delete-car-models/delete-car-models.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CarModelEntity])],
  controllers: [
    CarModelsAdminController,
  ],
  providers: [
    CreateCarModelsHandler,
    GetAllCarModelsHandler,
    GetOneCarModelsHandler,
    UpdateCarModelsHandler,
    DeleteCarModelsHandler,
  ],
})
export class CarModelsModule {}
