import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from '../../../entities/order.entity';

@Injectable()
export class GetOneOrdersHandler {
  async execute(id: number) {
    const item = await OrderEntity.findOne({ where: { id }, relations: { items: { product: true }, branch: true, user: true } });
    if (!item) throw new NotFoundException('Orders not found');
    return item;
  }
}
