import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMakeEntity } from './entities/car-make.entity';
import { CarMakesAdminController } from './car-makes/admin/car-makes-admin.controller';
import { CarMakesPublicController } from './car-makes/public/car-makes-public.controller';
import { CreateCarMakesHandler } from './car-makes/admin/create-car-makes/create-car-makes.handler';
import { GetAllCarMakesHandler } from './car-makes/admin/get-all-car-makes/get-all-car-makes.handler';
import { GetOneCarMakesHandler } from './car-makes/admin/get-one-car-makes/get-one-car-makes.handler';
import { UpdateCarMakesHandler } from './car-makes/admin/update-car-makes/update-car-makes.handler';
import { DeleteCarMakesHandler } from './car-makes/admin/delete-car-makes/delete-car-makes.handler';
import { GetAllCarMakesPublicHandler } from './car-makes/public/get-all-car-makes/get-all-car-makes.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CarMakeEntity])],
  controllers: [
    CarMakesAdminController,
    CarMakesPublicController,
  ],
  providers: [
    CreateCarMakesHandler,
    GetAllCarMakesHandler,
    GetOneCarMakesHandler,
    UpdateCarMakesHandler,
    DeleteCarMakesHandler,
    GetAllCarMakesPublicHandler,
  ],
})
export class CarMakesModule {}
