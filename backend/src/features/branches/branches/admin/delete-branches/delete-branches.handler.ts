import { Injectable, NotFoundException } from '@nestjs/common';
import { BranchEntity } from '../../../entities/branch.entity';

@Injectable()
export class DeleteBranchesHandler {
  async execute(id: number) {
    const item = await BranchEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Branches not found');
    await item.remove();
    return { id };
  }
}
