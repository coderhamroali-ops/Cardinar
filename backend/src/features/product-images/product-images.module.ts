import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { ProductImagesAdminController } from './product-images/admin/product-images-admin.controller';
import { CreateProductImagesHandler } from './product-images/admin/create-product-images/create-product-images.handler';
import { GetAllProductImagesHandler } from './product-images/admin/get-all-product-images/get-all-product-images.handler';
import { GetOneProductImagesHandler } from './product-images/admin/get-one-product-images/get-one-product-images.handler';
import { UpdateProductImagesHandler } from './product-images/admin/update-product-images/update-product-images.handler';
import { DeleteProductImagesHandler } from './product-images/admin/delete-product-images/delete-product-images.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageEntity])],
  controllers: [
    ProductImagesAdminController,
  ],
  providers: [
    CreateProductImagesHandler,
    GetAllProductImagesHandler,
    GetOneProductImagesHandler,
    UpdateProductImagesHandler,
    DeleteProductImagesHandler,
  ],
})
export class ProductImagesModule {}
