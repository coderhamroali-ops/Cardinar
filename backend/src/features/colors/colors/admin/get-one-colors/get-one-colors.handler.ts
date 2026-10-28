import { Injectable, NotFoundException } from '@nestjs/common';
import { ColorEntity } from '../../../entities/color.entity';

@Injectable()
export class GetOneColorsHandler {
  async execute(id: number) {
    const item = await ColorEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Colors not found');
    return item;
  }
}
