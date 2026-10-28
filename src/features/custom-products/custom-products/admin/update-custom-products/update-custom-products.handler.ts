import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { CustomProductEntity } from '../../../entities/custom-product.entity';
import { UpdateCustomProductsRequest } from './update-custom-products.request';

@Injectable()
export class UpdateCustomProductsHandler {
  async execute(id: number, payload: UpdateCustomProductsRequest) {
    const item = await CustomProductEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('CustomProducts not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
