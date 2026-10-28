import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from './entities/banner.entity';
import { BannersAdminController } from './banners/admin/banners-admin.controller';
import { CreateBannersHandler } from './banners/admin/create-banners/create-banners.handler';
import { GetAllBannersHandler } from './banners/admin/get-all-banners/get-all-banners.handler';
import { GetOneBannersHandler } from './banners/admin/get-one-banners/get-one-banners.handler';
import { UpdateBannersHandler } from './banners/admin/update-banners/update-banners.handler';
import { DeleteBannersHandler } from './banners/admin/delete-banners/delete-banners.handler';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  controllers: [
    BannersAdminController,
  ],
  providers: [
    CreateBannersHandler,
    GetAllBannersHandler,
    GetOneBannersHandler,
    UpdateBannersHandler,
    DeleteBannersHandler,
  ],
})
export class BannersModule {}
