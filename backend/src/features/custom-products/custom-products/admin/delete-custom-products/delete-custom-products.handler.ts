import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomProductEntity } from '../../../entities/custom-product.entity';

@Injectable()
export class DeleteCustomProductsHandler {
  async execute(id: number) {
    const item = await CustomProductEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CustomProducts not found');
    await item.remove();
    return { id };
  }
}
