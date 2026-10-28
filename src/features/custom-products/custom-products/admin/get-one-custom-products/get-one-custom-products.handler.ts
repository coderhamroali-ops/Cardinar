import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomProductEntity } from '../../../entities/custom-product.entity';

@Injectable()
export class GetOneCustomProductsHandler {
  async execute(id: number) {
    const item = await CustomProductEntity.findOne({ where: { id }, relations: { carMake: true, carModel: true, model: true } });
    if (!item) throw new NotFoundException('CustomProducts not found');
    return item;
  }
}
