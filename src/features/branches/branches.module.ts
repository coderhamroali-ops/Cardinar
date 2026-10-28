import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entities/branch.entity';
import { BranchesAdminController } from './branches/admin/branches-admin.controller';
import { BranchesPublicController } from './branches/public/branches-public.controller';
import { CreateBranchesHandler } from './branches/admin/create-branches/create-branches.handler';
import { GetAllBranchesHandler } from './branches/admin/get-all-branches/get-all-branches.handler';
import { GetOneBranchesHandler } from './branches/admin/get-one-branches/get-one-branches.handler';
import { UpdateBranchesHandler } from './branches/admin/update-branches/update-branches.handler';
import { DeleteBranchesHandler } from './branches/admin/delete-branches/delete-branches.handler';
import { GetAllBranchesPublicHandler } from './branches/public/get-all-branches/get-all-branches.handler';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  controllers: [
    BranchesAdminController,
    BranchesPublicController,
  ],
  providers: [
    CreateBranchesHandler,
    GetAllBranchesHandler,
    GetOneBranchesHandler,
    UpdateBranchesHandler,
    DeleteBranchesHandler,
    GetAllBranchesPublicHandler,
  ],
})
export class BranchesModule {}
