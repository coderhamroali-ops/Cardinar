import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductImageEntity } from '../../../entities/product-image.entity';
import { CreateProductImagesRequest } from './create-product-images.request';

@Injectable()
export class CreateProductImagesHandler {
  async execute(payload: CreateProductImagesRequest) {
    return saveOrConflict(ProductImageEntity.create({ ...payload }));
  }
}
