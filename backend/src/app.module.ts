import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { dataSourceOptions } from './data-source';
import { ArticulsModule } from './features/articuls/articuls.module';
import { AuthModule } from './features/auth/auth.module';
import { BannersModule } from './features/banners/banners.module';
import { BranchesModule } from './features/branches/branches.module';
import { CarMakesModule } from './features/car-makes/car-makes.module';
import { CarModelsModule } from './features/car-models/car-models.module';
import { CartModule } from './features/cart/cart.module';
import { CategoriesModule } from './features/categories/categories.module';
import { ColorsModule } from './features/colors/colors.module';
import { CustomModelsModule } from './features/custom-models/custom-models.module';
import { CustomProductsModule } from './features/custom-products/custom-products.module';
import { MaterialsModule } from './features/materials/materials.module';
import { OrdersModule } from './features/orders/orders.module';
import { PartsModule } from './features/parts/parts.module';
import { PhoneNumbersModule } from './features/phone-numbers/phone-numbers.module';
import { ProductColorsModule } from './features/product-colors/product-colors.module';
import { ProductImagesModule } from './features/product-images/product-images.module';
import { ProductsModule } from './features/products/products.module';
import { RequestsModule } from './features/requests/requests.module';
import { SiteModule } from './features/site/site.module';
import { SocialLinksModule } from './features/social-links/social-links.module';
import { StaticInfoModule } from './features/static-info/static-info.module';
import { UploadsModule } from './features/uploads/uploads.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    AuthModule,
    UsersModule,
    SiteModule,
    StaticInfoModule,
    BannersModule,
    PhoneNumbersModule,
    SocialLinksModule,
    BranchesModule,
    RequestsModule,
    ColorsModule,
    CarMakesModule,
    CarModelsModule,
    CategoriesModule,
    ProductsModule,
    ProductImagesModule,
    ArticulsModule,
    ProductColorsModule,
    CartModule,
    OrdersModule,
    MaterialsModule,
    CustomModelsModule,
    PartsModule,
    CustomProductsModule,
    UploadsModule,
  ],
})
export class AppModule {}
