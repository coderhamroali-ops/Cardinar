import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';
import { ColorsAdminController } from './colors/admin/colors-admin.controller';
import { ColorsPublicController } from './colors/public/colors-public.controller';
import { CreateColorsHandler } from './colors/admin/create-colors/create-colors.handler';
import { GetAllColorsHandler } from './colors/admin/get-all-colors/get-all-colors.handler';
import { GetOneColorsHandler } from './colors/admin/get-one-colors/get-one-colors.handler';
import { UpdateColorsHandler } from './colors/admin/update-colors/update-colors.handler';
import { DeleteColorsHandler } from './colors/admin/delete-colors/delete-colors.handler';
import { GetAllColorsPublicHandler } from './colors/public/get-all-colors/get-all-colors.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [
    ColorsAdminController,
    ColorsPublicController,
  ],
  providers: [
    CreateColorsHandler,
    GetAllColorsHandler,
    GetOneColorsHandler,
    UpdateColorsHandler,
    DeleteColorsHandler,
    GetAllColorsPublicHandler,
  ],
})
export class ColorsModule {}
