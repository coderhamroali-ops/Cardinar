import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductColorEntity } from '../../../entities/product-color.entity';

@Injectable()
export class DeleteProductColorsHandler {
  async execute(id: number) {
    const item = await ProductColorEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('ProductColors not found');
    await item.remove();
    return { id };
  }
}
