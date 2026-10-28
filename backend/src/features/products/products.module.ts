import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsAdminController } from './products/admin/products-admin.controller';
import { ProductsPublicController } from './products/public/products-public.controller';
import { CreateProductsHandler } from './products/admin/create-products/create-products.handler';
import { GetAllProductsHandler } from './products/admin/get-all-products/get-all-products.handler';
import { GetOneProductsHandler } from './products/admin/get-one-products/get-one-products.handler';
import { UpdateProductsHandler } from './products/admin/update-products/update-products.handler';
import { DeleteProductsHandler } from './products/admin/delete-products/delete-products.handler';
import { GetAllProductsPublicHandler } from './products/public/get-all-products/get-all-products.handler';
import { GetOneProductPublicHandler } from './products/public/get-one-product/get-one-product.handler';
import { GetSimilarProductsPublicHandler } from './products/public/get-similar-products/get-similar-products.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [
    ProductsAdminController,
    ProductsPublicController,
  ],
  providers: [
    CreateProductsHandler,
    GetAllProductsHandler,
    GetOneProductsHandler,
    UpdateProductsHandler,
    DeleteProductsHandler,
    GetAllProductsPublicHandler,
    GetOneProductPublicHandler,
    GetSimilarProductsPublicHandler,
  ],
})
export class ProductsModule {}
