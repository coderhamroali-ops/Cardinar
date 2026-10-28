import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialEntity } from '../../../entities/material.entity';

@Injectable()
export class DeleteMaterialsHandler {
  async execute(id: number) {
    const item = await MaterialEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Materials not found');
    await item.remove();
    return { id };
  }
}
