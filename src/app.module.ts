import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { dataSourceOptions } from './data-source';
import { BranchesModule } from './features/branches/branches.module';
import { CartModule } from './features/cart/cart.module';
import { CatalogModule } from './features/catalog/catalog.module';
import { ConstructorModule } from './features/constructor/constructor.module';
import { OrdersModule } from './features/orders/orders.module';
import { RequestsModule } from './features/requests/requests.module';
import { SiteModule } from './features/site/site.module';
import { UploadsModule } from './features/uploads/uploads.module';
import { AuthModule } from './features/users/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    SiteModule,
    BranchesModule,
    RequestsModule,
    CatalogModule,
    CartModule,
    OrdersModule,
    ConstructorModule,
    UploadsModule,
  ],
})
export class AppModule {}
