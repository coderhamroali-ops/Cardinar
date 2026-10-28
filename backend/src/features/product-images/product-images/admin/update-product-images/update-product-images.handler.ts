import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductImageEntity } from '../../../entities/product-image.entity';
import { UpdateProductImagesRequest } from './update-product-images.request';

@Injectable()
export class UpdateProductImagesHandler {
  async execute(id: number, payload: UpdateProductImagesRequest) {
    const item = await ProductImageEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('ProductImages not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
