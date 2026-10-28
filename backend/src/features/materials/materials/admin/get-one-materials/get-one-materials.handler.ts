import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialEntity } from '../../../entities/material.entity';

@Injectable()
export class GetOneMaterialsHandler {
  async execute(id: number) {
    const item = await MaterialEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Materials not found');
    return item;
  }
}
