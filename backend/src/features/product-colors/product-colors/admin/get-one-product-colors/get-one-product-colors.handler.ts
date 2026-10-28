import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductColorEntity } from '../../../entities/product-color.entity';

@Injectable()
export class GetOneProductColorsHandler {
  async execute(id: number) {
    const item = await ProductColorEntity.findOne({ where: { id }, relations: { color: true } });
    if (!item) throw new NotFoundException('ProductColors not found');
    return item;
  }
}
