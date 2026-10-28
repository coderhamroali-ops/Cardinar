import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../../entities/product.entity';

@Injectable()
export class DeleteProductsHandler {
  async execute(id: number) {
    const item = await ProductEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Products not found');
    await item.remove();
    return { id };
  }
}
