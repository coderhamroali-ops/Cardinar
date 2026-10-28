import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersAdminController } from './users/admin/users-admin.controller';
import { GetAllUsersHandler } from './users/admin/get-all-users/get-all-users.handler';
import { GetOneUsersHandler } from './users/admin/get-one-users/get-one-users.handler';
import { UpdateUsersHandler } from './users/admin/update-users/update-users.handler';
import { DeleteUsersHandler } from './users/admin/delete-users/delete-users.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    UsersAdminController,
  ],
  providers: [
    GetAllUsersHandler,
    GetOneUsersHandler,
    UpdateUsersHandler,
    DeleteUsersHandler,
  ],
})
export class UsersModule {}
