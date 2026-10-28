import { Injectable, NotFoundException } from '@nestjs/common';
import { ColorEntity } from '../../../entities/color.entity';

@Injectable()
export class DeleteColorsHandler {
  async execute(id: number) {
    const item = await ColorEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Colors not found');
    await item.remove();
    return { id };
  }
}
