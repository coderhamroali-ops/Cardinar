import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { BranchEntity } from '../../../entities/branch.entity';
import { UpdateBranchesRequest } from './update-branches.request';

@Injectable()
export class UpdateBranchesHandler {
  async execute(id: number, payload: UpdateBranchesRequest) {
    const item = await BranchEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Branches not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
