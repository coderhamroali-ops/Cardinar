import { Injectable, NotFoundException } from '@nestjs/common';
import { BranchEntity } from '../../../entities/branch.entity';

@Injectable()
export class GetOneBranchesHandler {
  async execute(id: number) {
    const item = await BranchEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Branches not found');
    return item;
  }
}
