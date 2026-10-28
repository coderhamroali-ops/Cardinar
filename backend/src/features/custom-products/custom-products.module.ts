import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomProductEntity } from './entities/custom-product.entity';
import { CustomProductsAdminController } from './custom-products/admin/custom-products-admin.controller';
import { CustomProductsPublicController } from './custom-products/public/custom-products-public.controller';
import { GetAllCustomProductsHandler } from './custom-products/admin/get-all-custom-products/get-all-custom-products.handler';
import { GetOneCustomProductsHandler } from './custom-products/admin/get-one-custom-products/get-one-custom-products.handler';
import { UpdateCustomProductsHandler } from './custom-products/admin/update-custom-products/update-custom-products.handler';
import { DeleteCustomProductsHandler } from './custom-products/admin/delete-custom-products/delete-custom-products.handler';
import { GetConstructorOptionsHandler } from './custom-products/public/get-constructor-options/get-constructor-options.handler';
import { CreateCustomProductHandler } from './custom-products/public/create-custom-product/create-custom-product.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CustomProductEntity])],
  controllers: [
    CustomProductsAdminController,
    CustomProductsPublicController,
  ],
  providers: [
    GetAllCustomProductsHandler,
    GetOneCustomProductsHandler,
    UpdateCustomProductsHandler,
    DeleteCustomProductsHandler,
    GetConstructorOptionsHandler,
    CreateCustomProductHandler,
  ],
})
export class CustomProductsModule {}
