import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticulEntity } from './entities/articul.entity';
import { ArticulsAdminController } from './articuls/admin/articuls-admin.controller';
import { CreateArticulsHandler } from './articuls/admin/create-articuls/create-articuls.handler';
import { GetAllArticulsHandler } from './articuls/admin/get-all-articuls/get-all-articuls.handler';
import { GetOneArticulsHandler } from './articuls/admin/get-one-articuls/get-one-articuls.handler';
import { UpdateArticulsHandler } from './articuls/admin/update-articuls/update-articuls.handler';
import { DeleteArticulsHandler } from './articuls/admin/delete-articuls/delete-articuls.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ArticulEntity])],
  controllers: [
    ArticulsAdminController,
  ],
  providers: [
    CreateArticulsHandler,
    GetAllArticulsHandler,
    GetOneArticulsHandler,
    UpdateArticulsHandler,
    DeleteArticulsHandler,
  ],
})
export class ArticulsModule {}
