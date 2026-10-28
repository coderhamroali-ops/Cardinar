import { Injectable, NotFoundException } from '@nestjs/common';
import { PartEntity } from '../../../entities/part.entity';

@Injectable()
export class GetOnePartsHandler {
  async execute(id: number) {
    const item = await PartEntity.findOne({ where: { id }, relations: { material: true, color: true } });
    if (!item) throw new NotFoundException('Parts not found');
    return item;
  }
}
