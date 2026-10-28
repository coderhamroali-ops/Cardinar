import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../../entities/product.entity';

@Injectable()
export class GetOneProductPublicHandler {
  async execute(id: number) {
    const product = await ProductEntity.findOne({
      where: { id },
      relations: { category: true, images: true, colors: { color: true }, articuls: { carModel: { carMake: true } } },
      order: { images: { position: 'ASC' }, articuls: { id: 'ASC' } },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
