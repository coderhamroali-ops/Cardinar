import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColorEntity } from './entities/product-color.entity';
import { ProductColorsAdminController } from './product-colors/admin/product-colors-admin.controller';
import { CreateProductColorsHandler } from './product-colors/admin/create-product-colors/create-product-colors.handler';
import { GetAllProductColorsHandler } from './product-colors/admin/get-all-product-colors/get-all-product-colors.handler';
import { GetOneProductColorsHandler } from './product-colors/admin/get-one-product-colors/get-one-product-colors.handler';
import { UpdateProductColorsHandler } from './product-colors/admin/update-product-colors/update-product-colors.handler';
import { DeleteProductColorsHandler } from './product-colors/admin/delete-product-colors/delete-product-colors.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColorEntity])],
  controllers: [
    ProductColorsAdminController,
  ],
  providers: [
    CreateProductColorsHandler,
    GetAllProductColorsHandler,
    GetOneProductColorsHandler,
    UpdateProductColorsHandler,
    DeleteProductColorsHandler,
  ],
})
export class ProductColorsModule {}
