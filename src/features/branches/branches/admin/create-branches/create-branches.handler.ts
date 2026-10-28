import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { BranchEntity } from '../../../entities/branch.entity';
import { CreateBranchesRequest } from './create-branches.request';

@Injectable()
export class CreateBranchesHandler {
  async execute(payload: CreateBranchesRequest) {
    return saveOrConflict(BranchEntity.create({ ...payload }));
  }
}
