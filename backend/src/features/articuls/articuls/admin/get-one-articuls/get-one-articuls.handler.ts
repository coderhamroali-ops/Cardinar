import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticulEntity } from '../../../entities/articul.entity';

@Injectable()
export class GetOneArticulsHandler {
  async execute(id: number) {
    const item = await ArticulEntity.findOne({ where: { id }, relations: { product: true, carModel: true } });
    if (!item) throw new NotFoundException('Articuls not found');
    return item;
  }
}
