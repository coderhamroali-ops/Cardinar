import { Injectable } from '@nestjs/common';
import { BranchEntity } from '../../../entities/branch.entity';
import { GetAllBranchesPublicRequest } from './get-all-branches.request';

// "Где купить?" sahifasi: avval rasmiy do'konlar, keyin hamkorlar
@Injectable()
export class GetAllBranchesPublicHandler {
  async execute(query: GetAllBranchesPublicRequest) {
    return BranchEntity.find({
      where: { isActive: true, branchType: query.branchType, region: query.region },
      order: { branchType: 'ASC', id: 'ASC' },
    });
  }
}
