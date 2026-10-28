import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductEntity } from '../../../entities/product.entity';
import { UpdateProductsRequest } from './update-products.request';

@Injectable()
export class UpdateProductsHandler {
  async execute(id: number, payload: UpdateProductsRequest) {
    const item = await ProductEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Products not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
