import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesAdminController } from './categories/admin/categories-admin.controller';
import { CategoriesPublicController } from './categories/public/categories-public.controller';
import { CreateCategoriesHandler } from './categories/admin/create-categories/create-categories.handler';
import { GetAllCategoriesHandler } from './categories/admin/get-all-categories/get-all-categories.handler';
import { GetOneCategoriesHandler } from './categories/admin/get-one-categories/get-one-categories.handler';
import { UpdateCategoriesHandler } from './categories/admin/update-categories/update-categories.handler';
import { DeleteCategoriesHandler } from './categories/admin/delete-categories/delete-categories.handler';
import { GetAllCategoriesPublicHandler } from './categories/public/get-all-categories/get-all-categories.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [
    CategoriesAdminController,
    CategoriesPublicController,
  ],
  providers: [
    CreateCategoriesHandler,
    GetAllCategoriesHandler,
    GetOneCategoriesHandler,
    UpdateCategoriesHandler,
    DeleteCategoriesHandler,
    GetAllCategoriesPublicHandler,
  ],
})
export class CategoriesModule {}
