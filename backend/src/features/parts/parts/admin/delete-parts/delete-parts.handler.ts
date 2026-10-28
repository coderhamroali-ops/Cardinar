import { Injectable, NotFoundException } from '@nestjs/common';
import { PartEntity } from '../../../entities/part.entity';

@Injectable()
export class DeletePartsHandler {
  async execute(id: number) {
    const item = await PartEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Parts not found');
    await item.remove();
    return { id };
  }
}
