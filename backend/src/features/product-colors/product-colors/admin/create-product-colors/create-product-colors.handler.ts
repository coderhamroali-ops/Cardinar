import { Injectable } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductColorEntity } from '../../../entities/product-color.entity';
import { CreateProductColorsRequest } from './create-product-colors.request';

@Injectable()
export class CreateProductColorsHandler {
  async execute(payload: CreateProductColorsRequest) {
    return saveOrConflict(ProductColorEntity.create({ ...payload }));
  }
}
