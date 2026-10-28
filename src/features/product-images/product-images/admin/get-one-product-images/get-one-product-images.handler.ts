import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductImageEntity } from '../../../entities/product-image.entity';

@Injectable()
export class GetOneProductImagesHandler {
  async execute(id: number) {
    const item = await ProductImageEntity.findOne({ where: { id } });
    if (!item) throw new NotFoundException('ProductImages not found');
    return item;
  }
}
