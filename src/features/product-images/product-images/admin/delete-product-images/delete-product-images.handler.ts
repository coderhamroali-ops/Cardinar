import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductImageEntity } from '../../../entities/product-image.entity';

@Injectable()
export class DeleteProductImagesHandler {
  async execute(id: number) {
    const item = await ProductImageEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('ProductImages not found');
    await item.remove();
    return { id };
  }
}
