import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticulEntity } from '../../../entities/articul.entity';

@Injectable()
export class DeleteArticulsHandler {
  async execute(id: number) {
    const item = await ArticulEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Articuls not found');
    await item.remove();
    return { id };
  }
}
