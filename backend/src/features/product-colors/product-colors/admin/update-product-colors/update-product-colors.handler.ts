import { Injectable, NotFoundException } from '@nestjs/common';
import { saveOrConflict } from '../../../../common/save-or-conflict';
import { ProductColorEntity } from '../../../entities/product-color.entity';
import { UpdateProductColorsRequest } from './update-product-colors.request';

@Injectable()
export class UpdateProductColorsHandler {
  async execute(id: number, payload: UpdateProductColorsRequest) {
    const item = await ProductColorEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('ProductColors not found');
    Object.assign(item, payload);
    return saveOrConflict(item);
  }
}
