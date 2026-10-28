import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../../entities/product.entity';

@Injectable()
export class GetOneProductsHandler {
  async execute(id: number) {
    const item = await ProductEntity.findOne({ where: { id }, relations: { category: true, images: true } });
    if (!item) throw new NotFoundException('Products not found');
    return item;
  }
}
