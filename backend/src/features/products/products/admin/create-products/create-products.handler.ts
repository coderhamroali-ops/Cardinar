import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductEntity } from '../../../entities/product.entity';
import { CreateProductsRequest } from './create-products.request';

@Injectable()
export class CreateProductsHandler {
  async execute(payload: CreateProductsRequest) {
    return saveOrConflict(ProductEntity.create({ ...payload }));
  }
}
